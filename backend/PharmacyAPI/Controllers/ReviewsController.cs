using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyAPI.Data;
using PharmacyAPI.DTOs;
using PharmacyAPI.Models;
using System.Security.Claims;

namespace PharmacyAPI.Controllers;

public class CreateReviewRequest
{
    public int ProductId  { get; set; }
    public int Rating     { get; set; } // 1-5
    public string? Comment { get; set; }
}

public class ReviewDto
{
    public int Id          { get; set; }
    public int Rating      { get; set; }
    public string? Comment { get; set; }
    public string UserName { get; set; } = "";
    public bool IsApproved { get; set; }
    public DateTime CreatedAt { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ReviewsController(AppDbContext db) => _db = db;

    /// <summary>Get approved reviews for a product</summary>
    [HttpGet("product/{productId:int}")]
    public async Task<IActionResult> GetProductReviews(int productId,
        [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var query  = _db.Reviews
            .Include(r => r.User)
            .Where(r => r.ProductId == productId && r.IsApproved)
            .OrderByDescending(r => r.CreatedAt);

        var total  = await query.CountAsync();
        var items  = await query.Skip((page - 1) * pageSize).Take(pageSize)
            .Select(r => new ReviewDto
            {
                Id = r.Id, Rating = r.Rating, Comment = r.Comment,
                UserName  = r.User.FirstName + " " + r.User.LastName[0] + ".",
                IsApproved = r.IsApproved, CreatedAt = r.CreatedAt
            }).ToListAsync();

        return Ok(ApiResponse<PagedResult<ReviewDto>>.Ok(new PagedResult<ReviewDto>
        {
            Items = items, TotalCount = total, Page = page, PageSize = pageSize
        }));
    }

    /// <summary>Submit a review (one per product per user)</summary>
    [HttpPost, Authorize]
    public async Task<IActionResult> CreateReview([FromBody] CreateReviewRequest req)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        // Check purchased
        var hasPurchased = await _db.OrderItems
            .AnyAsync(oi => oi.ProductId == req.ProductId
                         && oi.Order.UserId == userId
                         && oi.Order.Status == OrderStatus.Delivered);

        if (!hasPurchased)
            return BadRequest(ApiResponse<bool>.Fail("You can only review products you have purchased"));

        // Check already reviewed
        var existing = await _db.Reviews
            .FirstOrDefaultAsync(r => r.ProductId == req.ProductId && r.UserId == userId);

        if (existing != null)
            return BadRequest(ApiResponse<bool>.Fail("You have already reviewed this product"));

        var review = new Review
        {
            ProductId  = req.ProductId,
            UserId     = userId,
            Rating     = Math.Clamp(req.Rating, 1, 5),
            Comment    = req.Comment,
            IsApproved = false // Admin must approve
        };

        await _db.Reviews.AddAsync(review);
        await _db.SaveChangesAsync();

        return Ok(ApiResponse<bool>.Ok(true, "Review submitted and awaiting approval"));
    }

    /// <summary>Approve or reject a review (Admin only)</summary>
    [HttpPut("{id:int}/approve"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> ApproveReview(int id, [FromQuery] bool approve = true)
    {
        var review = await _db.Reviews.FindAsync(id);
        if (review == null) return NotFound(ApiResponse<bool>.Fail("Review not found"));
        review.IsApproved = approve;
        await _db.SaveChangesAsync();
        return Ok(ApiResponse<bool>.Ok(true, approve ? "Review approved" : "Review rejected"));
    }

    /// <summary>List all reviews (Admin)</summary>
    [HttpGet, Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllReviews(
        [FromQuery] bool? approved, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var query = _db.Reviews.Include(r => r.User).Include(r => r.Product).AsQueryable();
        if (approved.HasValue) query = query.Where(r => r.IsApproved == approved);
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(r => r.CreatedAt)
            .Skip((page - 1) * pageSize).Take(pageSize)
            .Select(r => new
            {
                r.Id, r.Rating, r.Comment, r.IsApproved, r.CreatedAt,
                UserName    = r.User.FirstName + " " + r.User.LastName,
                ProductName = r.Product.Name, r.ProductId
            }).ToListAsync();

        return Ok(ApiResponse<object>.Ok(new { items, total, page, pageSize }));
    }
}
