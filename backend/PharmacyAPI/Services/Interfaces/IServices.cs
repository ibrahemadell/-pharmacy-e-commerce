using PharmacyAPI.DTOs;
using PharmacyAPI.Models;

namespace PharmacyAPI.Services.Interfaces;

public interface IAuthService
{
    Task<ApiResponse<AuthResponse>> RegisterAsync(RegisterRequest request);
    Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest request);
    Task<ApiResponse<UserDto>> GetProfileAsync(int userId);
    Task<ApiResponse<UserDto>> UpdateProfileAsync(int userId, UpdateProfileRequest request);
    Task<ApiResponse<bool>> ChangePasswordAsync(int userId, ChangePasswordRequest request);
    string GenerateJwtToken(User user, List<string> roles);
}

public interface IProductService
{
    Task<ApiResponse<PagedResult<ProductListDto>>> GetProductsAsync(ProductFilterRequest filter);
    Task<ApiResponse<ProductDto>> GetProductAsync(int id);
    Task<ApiResponse<ProductDto>> GetProductBySlugAsync(string slug);
    Task<ApiResponse<List<ProductListDto>>> GetFeaturedAsync();
    Task<ApiResponse<List<ProductListDto>>> GetBestSellersAsync();
    Task<ApiResponse<List<ProductListDto>>> GetOffersAsync();
    Task<ApiResponse<List<ProductListDto>>> GetSimilarAsync(int productId);
    Task<ApiResponse<ProductDto>> CreateProductAsync(CreateProductRequest request);
    Task<ApiResponse<ProductDto>> UpdateProductAsync(int id, UpdateProductRequest request);
    Task<ApiResponse<bool>> DeleteProductAsync(int id);
    Task<ApiResponse<bool>> UpdateStockAsync(int id, int quantity, string? notes, int? userId);
    Task<ApiResponse<ProductImageDto>> AddProductImageAsync(int productId, string imageUrl, bool isPrimary);
    Task<ApiResponse<bool>> DeleteProductImageAsync(int imageId);
}

public interface ICategoryService
{
    Task<ApiResponse<List<CategoryDto>>> GetAllAsync();
    Task<ApiResponse<CategoryDto>> GetByIdAsync(int id);
    Task<ApiResponse<CategoryDto>> GetBySlugAsync(string slug);
    Task<ApiResponse<CategoryDto>> CreateAsync(CreateCategoryRequest request);
    Task<ApiResponse<CategoryDto>> UpdateAsync(int id, UpdateCategoryRequest request);
    Task<ApiResponse<bool>> DeleteAsync(int id);
}

public interface ICartService
{
    Task<ApiResponse<CartDto>> GetCartAsync(int userId);
    Task<ApiResponse<CartDto>> AddToCartAsync(int userId, AddToCartRequest request);
    Task<ApiResponse<CartDto>> UpdateCartItemAsync(int userId, int cartItemId, UpdateCartItemRequest request);
    Task<ApiResponse<CartDto>> RemoveFromCartAsync(int userId, int cartItemId);
    Task<ApiResponse<CartDto>> ClearCartAsync(int userId);
    Task<ApiResponse<CouponValidationResult>> ValidateCouponAsync(int userId, ApplyCouponRequest request);
}

public interface IOrderService
{
    Task<ApiResponse<OrderDto>> CreateOrderAsync(int userId, CreateOrderRequest request);
    Task<ApiResponse<OrderDto>> GetOrderAsync(int id, int? userId = null);
    Task<ApiResponse<PagedResult<OrderDto>>> GetOrdersAsync(int? userId, OrderStatus? status, int page, int pageSize);
    Task<ApiResponse<OrderDto>> UpdateOrderStatusAsync(int id, UpdateOrderStatusRequest request, int adminUserId);
    Task<ApiResponse<bool>> CancelOrderAsync(int id, int userId);
}

public interface IDashboardService
{
    Task<ApiResponse<DashboardStatsDto>> GetStatsAsync();
    Task<ApiResponse<List<MonthlyRevenueDto>>> GetMonthlyRevenueAsync(int months);
}

public interface ISettingService
{
    Task<ApiResponse<List<SettingDto>>> GetAllAsync();
    Task<ApiResponse<Dictionary<string, string?>>> GetByGroupAsync(string group);
    Task<ApiResponse<bool>> UpdateAsync(UpdateSettingsRequest request);
}

public interface IFileService
{
    Task<string> SaveFileAsync(IFormFile file, string folder);
    Task<bool> DeleteFileAsync(string filePath);
}
