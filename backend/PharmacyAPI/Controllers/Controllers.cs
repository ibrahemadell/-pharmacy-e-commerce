using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyAPI.DTOs;
using PharmacyAPI.Helpers;
using PharmacyAPI.Models;
using PharmacyAPI.Services.Interfaces;
using System.Security.Claims;

namespace PharmacyAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService) => _authService = authService;

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest req)
    {
        var result = await _authService.RegisterAsync(req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest req)
    {
        var result = await _authService.LoginAsync(req);
        return result.Success ? Ok(result) : Unauthorized(result);
    }

    [HttpGet("profile"), Authorize]
    public async Task<IActionResult> GetProfile()
    {
        var userId = GetUserId();
        var result = await _authService.GetProfileAsync(userId);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpPut("profile"), Authorize]
    public async Task<IActionResult> UpdateProfile(UpdateProfileRequest req)
    {
        var result = await _authService.UpdateProfileAsync(GetUserId(), req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPost("change-password"), Authorize]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequest req)
    {
        var result = await _authService.ChangePasswordAsync(GetUserId(), req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
}

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    public ProductsController(IProductService productService) => _productService = productService;

    [HttpGet]
    public async Task<IActionResult> GetProducts([FromQuery] ProductFilterRequest filter)
    {
        var result = await _productService.GetProductsAsync(filter);
        return Ok(result);
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeatured() => Ok(await _productService.GetFeaturedAsync());

    [HttpGet("best-sellers")]
    public async Task<IActionResult> GetBestSellers() => Ok(await _productService.GetBestSellersAsync());

    [HttpGet("offers")]
    public async Task<IActionResult> GetOffers() => Ok(await _productService.GetOffersAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _productService.GetProductAsync(id);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var result = await _productService.GetProductBySlugAsync(slug);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpGet("{id:int}/similar")]
    public async Task<IActionResult> GetSimilar(int id) => Ok(await _productService.GetSimilarAsync(id));

    [HttpPost, Authorize(Roles = "Admin,Pharmacist")]
    public async Task<IActionResult> Create([FromBody] CreateProductRequest req)
    {
        var result = await _productService.CreateProductAsync(req);
        return result.Success ? CreatedAtAction(nameof(GetById), new { id = result.Data!.Id }, result) : BadRequest(result);
    }

    [HttpPut("{id:int}"), Authorize(Roles = "Admin,Pharmacist")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductRequest req)
    {
        var result = await _productService.UpdateProductAsync(id, req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpDelete("{id:int}"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _productService.DeleteProductAsync(id);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPut("{id:int}/stock"), Authorize(Roles = "Admin,Pharmacist")]
    public async Task<IActionResult> UpdateStock(int id, [FromBody] UpdateStockRequest req)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var result = await _productService.UpdateStockAsync(id, req.Quantity, req.Notes, userId);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPost("{id:int}/images"), Authorize(Roles = "Admin,Pharmacist")]
    public async Task<IActionResult> AddImage(int id, [FromBody] AddImageRequest req)
    {
        var result = await _productService.AddProductImageAsync(id, req.ImageUrl, req.IsPrimary);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpDelete("images/{imageId:int}"), Authorize(Roles = "Admin,Pharmacist")]
    public async Task<IActionResult> DeleteImage(int imageId)
    {
        var result = await _productService.DeleteProductImageAsync(imageId);
        return result.Success ? Ok(result) : BadRequest(result);
    }
}

public class UpdateStockRequest { public int Quantity { get; set; } public string? Notes { get; set; } }
public class AddImageRequest { public string ImageUrl { get; set; } = ""; public bool IsPrimary { get; set; } }

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _service;
    public CategoriesController(ICategoryService service) => _service = service;

    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var result = await _service.GetBySlugAsync(slug);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpPost, Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(CreateCategoryRequest req)
    {
        var result = await _service.CreateAsync(req);
        return result.Success ? CreatedAtAction(nameof(GetById), new { id = result.Data!.Id }, result) : BadRequest(result);
    }

    [HttpPut("{id:int}"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, UpdateCategoryRequest req)
    {
        var result = await _service.UpdateAsync(id, req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpDelete("{id:int}"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        return result.Success ? Ok(result) : BadRequest(result);
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly ICartService _service;
    public CartController(ICartService service) => _service = service;

    [HttpGet] public async Task<IActionResult> GetCart() => Ok(await _service.GetCartAsync(GetUserId()));

    [HttpPost] public async Task<IActionResult> AddToCart(AddToCartRequest req)
    {
        var result = await _service.AddToCartAsync(GetUserId(), req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCartItem(int id, UpdateCartItemRequest req)
    {
        var result = await _service.UpdateCartItemAsync(GetUserId(), id, req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> RemoveItem(int id)
    {
        var result = await _service.RemoveFromCartAsync(GetUserId(), id);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpDelete] public async Task<IActionResult> ClearCart() => Ok(await _service.ClearCartAsync(GetUserId()));

    [HttpPost("validate-coupon")]
    public async Task<IActionResult> ValidateCoupon(ApplyCouponRequest req)
    {
        var result = await _service.ValidateCouponAsync(GetUserId(), req);
        return Ok(result);
    }

    private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _service;
    public OrdersController(IOrderService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderRequest req)
    {
        var result = await _service.CreateOrderAsync(GetUserId(), req);
        return result.Success ? CreatedAtAction(nameof(GetOrder), new { id = result.Data!.Id }, result) : BadRequest(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var isAdmin = User.IsInRole("Admin");
        var result = await _service.GetOrderAsync(id, isAdmin ? null : GetUserId());
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders(
        [FromQuery] OrderStatus? status, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var isAdmin = User.IsInRole("Admin");
        var result = await _service.GetOrdersAsync(isAdmin ? null : GetUserId(), status, page, pageSize);
        return Ok(result);
    }

    [HttpPut("{id:int}/status"), Authorize(Roles = "Admin,Pharmacist")]
    public async Task<IActionResult> UpdateStatus(int id, UpdateOrderStatusRequest req)
    {
        var result = await _service.UpdateOrderStatusAsync(id, req, GetUserId());
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPost("{id:int}/cancel")]
    public async Task<IActionResult> CancelOrder(int id)
    {
        var result = await _service.CancelOrderAsync(id, GetUserId());
        return result.Success ? Ok(result) : BadRequest(result);
    }

    private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AddressesController : ControllerBase
{
    private readonly Data.AppDbContext _db;
    private readonly AutoMapper.IMapper _mapper;

    public AddressesController(Data.AppDbContext db, AutoMapper.IMapper mapper)
    { _db = db; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetAddresses()
    {
        var userId = GetUserId();
        var addresses = await _db.Addresses.Where(a => a.UserId == userId).ToListAsync();
        return Ok(ApiResponse<List<AddressDto>>.Ok(_mapper.Map<List<AddressDto>>(addresses)));
    }

    [HttpPost]
    public async Task<IActionResult> AddAddress(CreateAddressRequest req)
    {
        var userId = GetUserId();
        if (req.IsDefault)
        {
            var existing = await _db.Addresses.Where(a => a.UserId == userId).ToListAsync();
            existing.ForEach(a => a.IsDefault = false);
        }
        var address = _mapper.Map<Address>(req);
        address.UserId = userId;
        await _db.Addresses.AddAsync(address);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAddresses), ApiResponse<AddressDto>.Ok(_mapper.Map<AddressDto>(address)));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateAddress(int id, CreateAddressRequest req)
    {
        var userId = GetUserId();
        var address = await _db.Addresses.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);
        if (address == null) return NotFound(ApiResponse<bool>.Fail("Address not found"));
        if (req.IsDefault)
        {
            var existing = await _db.Addresses.Where(a => a.UserId == userId && a.Id != id).ToListAsync();
            existing.ForEach(a => a.IsDefault = false);
        }
        _mapper.Map(req, address);
        await _db.SaveChangesAsync();
        return Ok(ApiResponse<AddressDto>.Ok(_mapper.Map<AddressDto>(address)));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAddress(int id)
    {
        var userId = GetUserId();
        var address = await _db.Addresses.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);
        if (address == null) return NotFound(ApiResponse<bool>.Fail("Address not found"));
        _db.Addresses.Remove(address);
        await _db.SaveChangesAsync();
        return Ok(ApiResponse<bool>.Ok(true));
    }

    private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
}

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class CouponsController : ControllerBase
{
    private readonly Data.AppDbContext _db;
    private readonly AutoMapper.IMapper _mapper;
    public CouponsController(Data.AppDbContext db, AutoMapper.IMapper mapper)
    { _db = db; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetCoupons([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var total = await _db.Coupons.CountAsync();
        var coupons = await _db.Coupons.OrderByDescending(c => c.CreatedAt)
            .Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return Ok(ApiResponse<PagedResult<CouponDto>>.Ok(new PagedResult<CouponDto>
        {
            Items = _mapper.Map<List<CouponDto>>(coupons), TotalCount = total, Page = page, PageSize = pageSize
        }));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCouponRequest req)
    {
        if (await _db.Coupons.AnyAsync(c => c.Code.ToUpper() == req.Code.ToUpper()))
            return BadRequest(ApiResponse<bool>.Fail("Coupon code already exists"));
        var coupon = _mapper.Map<Coupon>(req);
        coupon.Code = req.Code.ToUpper();
        await _db.Coupons.AddAsync(coupon);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCoupons), ApiResponse<CouponDto>.Ok(_mapper.Map<CouponDto>(coupon)));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, CreateCouponRequest req)
    {
        var coupon = await _db.Coupons.FindAsync(id);
        if (coupon == null) return NotFound(ApiResponse<bool>.Fail("Coupon not found"));
        _mapper.Map(req, coupon);
        await _db.SaveChangesAsync();
        return Ok(ApiResponse<CouponDto>.Ok(_mapper.Map<CouponDto>(coupon)));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var coupon = await _db.Coupons.FindAsync(id);
        if (coupon == null) return NotFound();
        _db.Coupons.Remove(coupon);
        await _db.SaveChangesAsync();
        return Ok(ApiResponse<bool>.Ok(true));
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _service;
    public DashboardController(IDashboardService service) => _service = service;

    [HttpGet("stats")] public async Task<IActionResult> GetStats() => Ok(await _service.GetStatsAsync());

    [HttpGet("revenue")]
    public async Task<IActionResult> GetRevenue([FromQuery] int months = 12) =>
        Ok(await _service.GetMonthlyRevenueAsync(months));
}

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ISettingService _service;
    public SettingsController(ISettingService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

    [HttpGet("group/{group}")]
    public async Task<IActionResult> GetByGroup(string group) => Ok(await _service.GetByGroupAsync(group));

    [HttpPut, Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(UpdateSettingsRequest req)
    {
        var result = await _service.UpdateAsync(req);
        return result.Success ? Ok(result) : BadRequest(result);
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class UsersController : ControllerBase
{
    private readonly Repositories.Interfaces.IUserRepository _repo;
    private readonly AutoMapper.IMapper _mapper;
    public UsersController(Repositories.Interfaces.IUserRepository repo, AutoMapper.IMapper mapper)
    { _repo = repo; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var result = await _repo.GetPagedAsync(search, page, pageSize);
        return Ok(ApiResponse<PagedResult<UserDto>>.Ok(new PagedResult<UserDto>
        {
            Items = _mapper.Map<List<UserDto>>(result.Items), TotalCount = result.TotalCount,
            Page = result.Page, PageSize = result.PageSize
        }));
    }
}
