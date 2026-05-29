using PharmacyAPI.DTOs;
using PharmacyAPI.Models;

namespace PharmacyAPI.Repositories.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task<bool> ExistsAsync(int id);
    Task SaveChangesAsync();
}

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetWithRolesAsync(int id);
    Task<bool> EmailExistsAsync(string email);
    Task<PagedResult<User>> GetPagedAsync(string? search, int page, int pageSize);
}

public interface IProductRepository : IGenericRepository<Product>
{
    Task<Product?> GetBySlugAsync(string slug);
    Task<Product?> GetWithDetailsAsync(int id);
    Task<PagedResult<Product>> GetPagedAsync(ProductFilterRequest filter);
    Task<List<Product>> GetFeaturedAsync(int count = 8);
    Task<List<Product>> GetBestSellersAsync(int count = 8);
    Task<List<Product>> GetByOfferAsync(int count = 8);
    Task<List<Product>> GetSimilarAsync(int productId, int categoryId, int count = 6);
    Task<List<Product>> GetLowStockAsync();
    Task<bool> SlugExistsAsync(string slug, int? excludeId = null);
}

public interface ICategoryRepository : IGenericRepository<Category>
{
    Task<Category?> GetBySlugAsync(string slug);
    Task<List<Category>> GetWithChildrenAsync();
    Task<bool> SlugExistsAsync(string slug, int? excludeId = null);
}

public interface IOrderRepository : IGenericRepository<Order>
{
    Task<Order?> GetWithDetailsAsync(int id);
    Task<Order?> GetByOrderNumberAsync(string orderNumber);
    Task<PagedResult<Order>> GetPagedAsync(int? userId, OrderStatus? status, int page, int pageSize);
    Task<DashboardStatsDto> GetDashboardStatsAsync();
    Task<List<MonthlyRevenueDto>> GetMonthlyRevenueAsync(int months = 12);
}

public interface ICartRepository : IGenericRepository<CartItem>
{
    Task<List<CartItem>> GetUserCartAsync(int userId);
    Task<CartItem?> GetCartItemAsync(int userId, int productId, int? variantId);
    Task ClearCartAsync(int userId);
}

public interface ICouponRepository : IGenericRepository<Coupon>
{
    Task<Coupon?> GetByCodeAsync(string code);
}

public interface ISettingRepository
{
    Task<Setting?> GetByKeyAsync(string key);
    Task<List<Setting>> GetByGroupAsync(string group);
    Task<List<Setting>> GetAllAsync();
    Task UpsertAsync(string key, string value);
    Task BulkUpsertAsync(Dictionary<string, string> settings);
}
