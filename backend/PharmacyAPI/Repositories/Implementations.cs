using Microsoft.EntityFrameworkCore;
using PharmacyAPI.Data;
using PharmacyAPI.DTOs;
using PharmacyAPI.Models;
using PharmacyAPI.Repositories.Interfaces;

namespace PharmacyAPI.Repositories;

// ─── Generic Repository ───────────────────────────────────────────────────────

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly AppDbContext _db;
    public GenericRepository(AppDbContext db) => _db = db;

    public async Task<T?> GetByIdAsync(int id) => await _db.Set<T>().FindAsync(id);
    public async Task<IEnumerable<T>> GetAllAsync() => await _db.Set<T>().ToListAsync();
    public async Task<T> AddAsync(T entity) { await _db.Set<T>().AddAsync(entity); return entity; }
    public async Task UpdateAsync(T entity) { _db.Set<T>().Update(entity); await Task.CompletedTask; }
    public async Task DeleteAsync(T entity) { _db.Set<T>().Remove(entity); await Task.CompletedTask; }
    public async Task<bool> ExistsAsync(int id) => await _db.Set<T>().FindAsync(id) != null;
    public async Task SaveChangesAsync() => await _db.SaveChangesAsync();
}

// ─── User Repository ──────────────────────────────────────────────────────────

public class UserRepository : GenericRepository<User>, IUserRepository
{
    public UserRepository(AppDbContext db) : base(db) { }

    public async Task<User?> GetByEmailAsync(string email) =>
        await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());

    public async Task<User?> GetWithRolesAsync(int id) =>
        await _db.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Id == id);

    public async Task<bool> EmailExistsAsync(string email) =>
        await _db.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());

    public async Task<PagedResult<User>> GetPagedAsync(string? search, int page, int pageSize)
    {
        var query = _db.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).AsQueryable();
        if (!string.IsNullOrEmpty(search))
            query = query.Where(u => u.FirstName.Contains(search) || u.LastName.Contains(search) || u.Email.Contains(search));

        var total = await query.CountAsync();
        var items = await query.OrderByDescending(u => u.CreatedAt)
            .Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PagedResult<User> { Items = items, TotalCount = total, Page = page, PageSize = pageSize };
    }
}

// ─── Product Repository ────────────────────────────────────────────────────────

public class ProductRepository : GenericRepository<Product>, IProductRepository
{
    public ProductRepository(AppDbContext db) : base(db) { }

    private IQueryable<Product> WithDetails() =>
        _db.Products
            .Include(p => p.Category)
            .Include(p => p.Images)
            .Include(p => p.Variants)
            .Include(p => p.Reviews.Where(r => r.IsApproved));

    public async Task<Product?> GetBySlugAsync(string slug) =>
        await WithDetails().FirstOrDefaultAsync(p => p.Slug == slug);

    public async Task<Product?> GetWithDetailsAsync(int id) =>
        await WithDetails().FirstOrDefaultAsync(p => p.Id == id);

    public async Task<PagedResult<Product>> GetPagedAsync(ProductFilterRequest f)
    {
        var q = WithDetails().Where(p => p.IsActive);

        if (!string.IsNullOrEmpty(f.Search))
            q = q.Where(p => p.Name.Contains(f.Search) || (p.Description != null && p.Description.Contains(f.Search))
                || (p.Brand != null && p.Brand.Contains(f.Search)) || (p.Barcode != null && p.Barcode.Contains(f.Search)));

        if (f.CategoryId.HasValue)
            q = q.Where(p => p.CategoryId == f.CategoryId || (p.Category.ParentId == f.CategoryId));

        if (!string.IsNullOrEmpty(f.Brand))
            q = q.Where(p => p.Brand == f.Brand);

        if (f.MinPrice.HasValue) q = q.Where(p => p.Price >= f.MinPrice);
        if (f.MaxPrice.HasValue) q = q.Where(p => p.Price <= f.MaxPrice);
        if (f.InStock.HasValue && f.InStock.Value) q = q.Where(p => p.StockQuantity > 0);
        if (f.IsFeatured.HasValue) q = q.Where(p => p.IsFeatured == f.IsFeatured);
        if (f.IsBestSeller.HasValue) q = q.Where(p => p.IsBestSeller == f.IsBestSeller);
        if (f.HasDiscount.HasValue && f.HasDiscount.Value) q = q.Where(p => p.DiscountPrice != null);

        q = f.SortBy switch
        {
            "price" => f.SortDir == "asc" ? q.OrderBy(p => p.DiscountPrice ?? p.Price) : q.OrderByDescending(p => p.DiscountPrice ?? p.Price),
            "name" => f.SortDir == "asc" ? q.OrderBy(p => p.Name) : q.OrderByDescending(p => p.Name),
            _ => q.OrderByDescending(p => p.CreatedAt)
        };

        var total = await q.CountAsync();
        var items = await q.Skip((f.Page - 1) * f.PageSize).Take(f.PageSize).ToListAsync();
        return new PagedResult<Product> { Items = items, TotalCount = total, Page = f.Page, PageSize = f.PageSize };
    }

    public async Task<List<Product>> GetFeaturedAsync(int count = 8) =>
        await WithDetails().Where(p => p.IsActive && p.IsFeatured).OrderByDescending(p => p.CreatedAt).Take(count).ToListAsync();

    public async Task<List<Product>> GetBestSellersAsync(int count = 8) =>
        await WithDetails().Where(p => p.IsActive && p.IsBestSeller).OrderByDescending(p => p.CreatedAt).Take(count).ToListAsync();

    public async Task<List<Product>> GetByOfferAsync(int count = 8) =>
        await WithDetails().Where(p => p.IsActive && p.DiscountPrice != null).OrderByDescending(p => p.DiscountPercent).Take(count).ToListAsync();

    public async Task<List<Product>> GetSimilarAsync(int productId, int categoryId, int count = 6) =>
        await WithDetails().Where(p => p.IsActive && p.CategoryId == categoryId && p.Id != productId)
            .OrderByDescending(p => p.IsFeatured).Take(count).ToListAsync();

    public async Task<List<Product>> GetLowStockAsync() =>
        await WithDetails().Where(p => p.IsActive && p.StockQuantity <= p.LowStockThreshold).OrderBy(p => p.StockQuantity).ToListAsync();

    public async Task<bool> SlugExistsAsync(string slug, int? excludeId = null) =>
        await _db.Products.AnyAsync(p => p.Slug == slug && (!excludeId.HasValue || p.Id != excludeId));
}

// ─── Category Repository ──────────────────────────────────────────────────────

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
    public CategoryRepository(AppDbContext db) : base(db) { }

    public async Task<Category?> GetBySlugAsync(string slug) =>
        await _db.Categories.Include(c => c.Children).Include(c => c.Parent)
            .FirstOrDefaultAsync(c => c.Slug == slug);

    public async Task<List<Category>> GetWithChildrenAsync() =>
        await _db.Categories.Include(c => c.Children).Include(c => c.Products)
            .Where(c => c.ParentId == null && c.IsActive).OrderBy(c => c.SortOrder).ToListAsync();

    public async Task<bool> SlugExistsAsync(string slug, int? excludeId = null) =>
        await _db.Categories.AnyAsync(c => c.Slug == slug && (!excludeId.HasValue || c.Id != excludeId));
}

// ─── Order Repository ──────────────────────────────────────────────────────────

public class OrderRepository : GenericRepository<Order>, IOrderRepository
{
    public OrderRepository(AppDbContext db) : base(db) { }

    public async Task<Order?> GetWithDetailsAsync(int id) =>
        await _db.Orders
            .Include(o => o.User)
            .Include(o => o.Address)
            .Include(o => o.Coupon)
            .Include(o => o.Items).ThenInclude(i => i.Product)
            .Include(o => o.StatusHistory)
            .FirstOrDefaultAsync(o => o.Id == id);

    public async Task<Order?> GetByOrderNumberAsync(string orderNumber) =>
        await _db.Orders.Include(o => o.Items).ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.OrderNumber == orderNumber);

    public async Task<PagedResult<Order>> GetPagedAsync(int? userId, OrderStatus? status, int page, int pageSize)
    {
        var q = _db.Orders.Include(o => o.User).Include(o => o.Items).AsQueryable();
        if (userId.HasValue) q = q.Where(o => o.UserId == userId);
        if (status.HasValue) q = q.Where(o => o.Status == status);
        var total = await q.CountAsync();
        var items = await q.OrderByDescending(o => o.CreatedAt).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedResult<Order> { Items = items, TotalCount = total, Page = page, PageSize = pageSize };
    }

    public async Task<DashboardStatsDto> GetDashboardStatsAsync()
    {
        var today = DateTime.UtcNow.Date;
        var thisMonth = new DateTime(today.Year, today.Month, 1);

        var totalOrders = await _db.Orders.CountAsync();
        var pendingOrders = await _db.Orders.CountAsync(o => o.Status == OrderStatus.Pending);
        var todayOrders = await _db.Orders.CountAsync(o => o.CreatedAt.Date == today);
        var totalRevenue = await _db.Orders.Where(o => o.PaymentStatus == PaymentStatus.Paid).SumAsync(o => o.Total);
        var todayRevenue = await _db.Orders.Where(o => o.CreatedAt.Date == today && o.PaymentStatus == PaymentStatus.Paid).SumAsync(o => o.Total);
        var monthRevenue = await _db.Orders.Where(o => o.CreatedAt >= thisMonth && o.PaymentStatus == PaymentStatus.Paid).SumAsync(o => o.Total);
        var totalProducts = await _db.Products.CountAsync(p => p.IsActive);
        var lowStockProducts = await _db.Products.CountAsync(p => p.IsActive && p.StockQuantity <= p.LowStockThreshold && p.StockQuantity > 0);
        var outOfStock = await _db.Products.CountAsync(p => p.IsActive && p.StockQuantity == 0);
        var totalCustomers = await _db.Users.CountAsync(u => u.UserRoles.Any(ur => ur.Role.Name == "Customer"));
        var newCustomers = await _db.Users.CountAsync(u => u.CreatedAt >= thisMonth);

        var recentOrders = await _db.Orders.Include(o => o.User)
            .OrderByDescending(o => o.CreatedAt).Take(10)
            .Select(o => new RecentOrderDto
            {
                Id = o.Id, OrderNumber = o.OrderNumber,
                CustomerName = o.User.FirstName + " " + o.User.LastName,
                Total = o.Total, Status = o.Status.ToString(), CreatedAt = o.CreatedAt
            }).ToListAsync();

        var lowStockAlerts = await _db.Products.Include(p => p.Images)
            .Where(p => p.IsActive && p.StockQuantity <= p.LowStockThreshold)
            .OrderBy(p => p.StockQuantity).Take(10)
            .Select(p => new LowStockProductDto
            {
                Id = p.Id, Name = p.Name, StockQuantity = p.StockQuantity,
                LowStockThreshold = p.LowStockThreshold,
                PrimaryImage = p.Images.OrderBy(i => i.SortOrder).Select(i => i.ImageUrl).FirstOrDefault()
            }).ToListAsync();

        return new DashboardStatsDto
        {
            TotalOrders = totalOrders, PendingOrders = pendingOrders, TodayOrders = todayOrders,
            TotalRevenue = totalRevenue, TodayRevenue = todayRevenue, MonthRevenue = monthRevenue,
            TotalProducts = totalProducts, LowStockProducts = lowStockProducts, OutOfStockProducts = outOfStock,
            TotalCustomers = totalCustomers, NewCustomersThisMonth = newCustomers,
            RecentOrders = recentOrders, LowStockAlerts = lowStockAlerts
        };
    }

    public async Task<List<MonthlyRevenueDto>> GetMonthlyRevenueAsync(int months = 12)
    {
        var from = DateTime.UtcNow.AddMonths(-months);
        var orders = await _db.Orders
            .Where(o => o.CreatedAt >= from && o.PaymentStatus == PaymentStatus.Paid)
            .GroupBy(o => new { o.CreatedAt.Year, o.CreatedAt.Month })
            .Select(g => new MonthlyRevenueDto
            {
                Month = g.Key.Year + "-" + g.Key.Month.ToString("D2"),
                Revenue = g.Sum(o => o.Total),
                OrderCount = g.Count()
            }).OrderBy(r => r.Month).ToListAsync();
        return orders;
    }
}

// ─── Cart Repository ──────────────────────────────────────────────────────────

public class CartRepository : GenericRepository<CartItem>, ICartRepository
{
    public CartRepository(AppDbContext db) : base(db) { }

    public async Task<List<CartItem>> GetUserCartAsync(int userId) =>
        await _db.CartItems
            .Include(c => c.Product).ThenInclude(p => p.Images)
            .Include(c => c.Variant)
            .Where(c => c.UserId == userId).ToListAsync();

    public async Task<CartItem?> GetCartItemAsync(int userId, int productId, int? variantId) =>
        await _db.CartItems.FirstOrDefaultAsync(c =>
            c.UserId == userId && c.ProductId == productId && c.VariantId == variantId);

    public async Task ClearCartAsync(int userId)
    {
        var items = await _db.CartItems.Where(c => c.UserId == userId).ToListAsync();
        _db.CartItems.RemoveRange(items);
    }
}

// ─── Coupon Repository ────────────────────────────────────────────────────────

public class CouponRepository : GenericRepository<Coupon>, ICouponRepository
{
    public CouponRepository(AppDbContext db) : base(db) { }

    public async Task<Coupon?> GetByCodeAsync(string code) =>
        await _db.Coupons.FirstOrDefaultAsync(c => c.Code.ToUpper() == code.ToUpper());
}

// ─── Setting Repository ────────────────────────────────────────────────────────

public class SettingRepository : ISettingRepository
{
    private readonly AppDbContext _db;
    public SettingRepository(AppDbContext db) => _db = db;

    public async Task<Setting?> GetByKeyAsync(string key) =>
        await _db.Settings.FirstOrDefaultAsync(s => s.Key == key);

    public async Task<List<Setting>> GetByGroupAsync(string group) =>
        await _db.Settings.Where(s => s.Group == group).ToListAsync();

    public async Task<List<Setting>> GetAllAsync() =>
        await _db.Settings.OrderBy(s => s.Group).ThenBy(s => s.Key).ToListAsync();

    public async Task UpsertAsync(string key, string value)
    {
        var setting = await _db.Settings.FirstOrDefaultAsync(s => s.Key == key);
        if (setting == null)
            await _db.Settings.AddAsync(new Setting { Key = key, Value = value, UpdatedAt = DateTime.UtcNow });
        else
        {
            setting.Value = value;
            setting.UpdatedAt = DateTime.UtcNow;
        }
        await _db.SaveChangesAsync();
    }

    public async Task BulkUpsertAsync(Dictionary<string, string> settings)
    {
        foreach (var kv in settings)
        {
            var setting = await _db.Settings.FirstOrDefaultAsync(s => s.Key == kv.Key);
            if (setting == null)
                await _db.Settings.AddAsync(new Setting { Key = kv.Key, Value = kv.Value, UpdatedAt = DateTime.UtcNow });
            else
            {
                setting.Value = kv.Value;
                setting.UpdatedAt = DateTime.UtcNow;
            }
        }
        await _db.SaveChangesAsync();
    }
}
