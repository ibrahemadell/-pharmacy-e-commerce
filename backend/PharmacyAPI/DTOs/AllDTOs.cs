using PharmacyAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace PharmacyAPI.DTOs;

// ─── Auth DTOs ───────────────────────────────────────────────────────────────

public class RegisterRequest
{
    [Required, MaxLength(100)] public string FirstName { get; set; } = "";
    [Required, MaxLength(100)] public string LastName { get; set; } = "";
    [Required, EmailAddress] public string Email { get; set; } = "";
    [Required, MinLength(8)] public string Password { get; set; } = "";
    [MaxLength(20)] public string? PhoneNumber { get; set; }
}

public class LoginRequest
{
    [Required, EmailAddress] public string Email { get; set; } = "";
    [Required] public string Password { get; set; } = "";
}

public class AuthResponse
{
    public string Token { get; set; } = "";
    public string RefreshToken { get; set; } = "";
    public DateTime ExpiresAt { get; set; }
    public UserDto User { get; set; } = null!;
}

public class ChangePasswordRequest
{
    [Required] public string CurrentPassword { get; set; } = "";
    [Required, MinLength(8)] public string NewPassword { get; set; } = "";
}

// ─── User DTOs ───────────────────────────────────────────────────────────────

public class UserDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public string? PhoneNumber { get; set; }
    public string? ProfileImage { get; set; }
    public List<string> Roles { get; set; } = new();
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class UpdateProfileRequest
{
    [Required, MaxLength(100)] public string FirstName { get; set; } = "";
    [Required, MaxLength(100)] public string LastName { get; set; } = "";
    [MaxLength(20)] public string? PhoneNumber { get; set; }
}

// ─── Category DTOs ───────────────────────────────────────────────────────────

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Slug { get; set; } = "";
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public int? ParentId { get; set; }
    public string? ParentName { get; set; }
    public int ProductCount { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; }
    public List<CategoryDto> Children { get; set; } = new();
}

public class CreateCategoryRequest
{
    [Required, MaxLength(100)] public string Name { get; set; } = "";
    [MaxLength(500)] public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public int? ParentId { get; set; }
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
}

public class UpdateCategoryRequest : CreateCategoryRequest { }

// ─── Product DTOs ────────────────────────────────────────────────────────────

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Slug { get; set; } = "";
    public string? Barcode { get; set; }
    public string? Description { get; set; }
    public string? ShortDescription { get; set; }
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public int DiscountPercent { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = "";
    public string? Brand { get; set; }
    public string? Manufacturer { get; set; }
    public string? Unit { get; set; }
    public int StockQuantity { get; set; }
    public bool IsLowStock { get; set; }
    public bool IsOutOfStock { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public bool IsPrescriptionRequired { get; set; }
    public bool IsAvailableOnWhatsApp { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsBestSeller { get; set; }
    public bool IsActive { get; set; }
    public string? PrimaryImage { get; set; }
    public List<ProductImageDto> Images { get; set; } = new();
    public List<ProductVariantDto> Variants { get; set; } = new();
    public double AverageRating { get; set; }
    public int ReviewCount { get; set; }
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ProductListDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Slug { get; set; } = "";
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public int DiscountPercent { get; set; }
    public string CategoryName { get; set; } = "";
    public int StockQuantity { get; set; }
    public bool IsLowStock { get; set; }
    public bool IsOutOfStock { get; set; }
    public bool IsPrescriptionRequired { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsBestSeller { get; set; }
    public string? PrimaryImage { get; set; }
    public double AverageRating { get; set; }
    public int ReviewCount { get; set; }
}

public class ProductImageDto
{
    public int Id { get; set; }
    public string ImageUrl { get; set; } = "";
    public bool IsPrimary { get; set; }
    public int SortOrder { get; set; }
    public string? AltText { get; set; }
}

public class ProductVariantDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string? Value { get; set; }
    public decimal? PriceModifier { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; }
}

public class CreateProductRequest
{
    [Required, MaxLength(200)] public string Name { get; set; } = "";
    [MaxLength(100)] public string? Barcode { get; set; }
    [MaxLength(2000)] public string? Description { get; set; }
    [MaxLength(500)] public string? ShortDescription { get; set; }
    [Required, Range(0, double.MaxValue)] public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    [Required] public int CategoryId { get; set; }
    [MaxLength(100)] public string? Brand { get; set; }
    [MaxLength(100)] public string? Manufacturer { get; set; }
    [MaxLength(50)] public string? Unit { get; set; }
    public int StockQuantity { get; set; } = 0;
    public int LowStockThreshold { get; set; } = 10;
    public DateTime? ExpiryDate { get; set; }
    public bool IsPrescriptionRequired { get; set; } = false;
    public bool IsAvailableOnWhatsApp { get; set; } = false;
    public bool IsFeatured { get; set; } = false;
    public bool IsBestSeller { get; set; } = false;
    public bool IsActive { get; set; } = true;
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public List<CreateProductVariantRequest> Variants { get; set; } = new();
}

public class CreateProductVariantRequest
{
    [Required, MaxLength(100)] public string Name { get; set; } = "";
    [MaxLength(100)] public string? Value { get; set; }
    public decimal? PriceModifier { get; set; }
    public int StockQuantity { get; set; } = 0;
}

public class UpdateProductRequest : CreateProductRequest { }

public class ProductFilterRequest
{
    public string? Search { get; set; }
    public int? CategoryId { get; set; }
    public string? Brand { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public bool? InStock { get; set; }
    public bool? IsFeatured { get; set; }
    public bool? IsBestSeller { get; set; }
    public bool? HasDiscount { get; set; }
    public string? SortBy { get; set; } = "createdAt"; // price, name, rating, createdAt
    public string? SortDir { get; set; } = "desc";
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 12;
}

// ─── Cart DTOs ───────────────────────────────────────────────────────────────

public class CartItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = "";
    public string ProductSlug { get; set; } = "";
    public string? ProductImage { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal? DiscountPrice { get; set; }
    public int? VariantId { get; set; }
    public string? VariantName { get; set; }
    public int Quantity { get; set; }
    public int MaxQuantity { get; set; }
    public decimal LineTotal { get; set; }
    public bool IsPrescriptionRequired { get; set; }
}

public class CartDto
{
    public List<CartItemDto> Items { get; set; } = new();
    public decimal SubTotal { get; set; }
    public decimal DeliveryFee { get; set; }
    public decimal Discount { get; set; }
    public decimal Total { get; set; }
    public string? CouponCode { get; set; }
    public bool HasPrescriptionItems { get; set; }
    public int ItemCount { get; set; }
}

public class AddToCartRequest
{
    [Required] public int ProductId { get; set; }
    public int? VariantId { get; set; }
    [Range(1, 100)] public int Quantity { get; set; } = 1;
}

public class UpdateCartItemRequest
{
    [Required, Range(0, 100)] public int Quantity { get; set; }
}

// ─── Order DTOs ──────────────────────────────────────────────────────────────

public class OrderDto
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = "";
    public string Status { get; set; } = "";
    public string PaymentMethod { get; set; } = "";
    public string PaymentStatus { get; set; } = "";
    public decimal SubTotal { get; set; }
    public decimal DeliveryFee { get; set; }
    public decimal Discount { get; set; }
    public decimal Total { get; set; }
    public string? CouponCode { get; set; }
    public AddressDto? Address { get; set; }
    public string? Notes { get; set; }
    public string? TrackingNumber { get; set; }
    public bool HasPrescriptionItems { get; set; }
    public string? PrescriptionImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
    public List<OrderStatusHistoryDto> StatusHistory { get; set; } = new();
    public UserDto? User { get; set; }
}

public class OrderItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = "";
    public string? VariantName { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}

public class OrderStatusHistoryDto
{
    public string Status { get; set; } = "";
    public string? Notes { get; set; }
    public DateTime ChangedAt { get; set; }
}

public class CreateOrderRequest
{
    [Required] public int AddressId { get; set; }
    public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.CashOnDelivery;
    public string? CouponCode { get; set; }
    [MaxLength(1000)] public string? Notes { get; set; }
    public string? PrescriptionImageUrl { get; set; }
}

public class UpdateOrderStatusRequest
{
    [Required] public OrderStatus Status { get; set; }
    [MaxLength(500)] public string? Notes { get; set; }
    public string? TrackingNumber { get; set; }
}

// ─── Address DTOs ────────────────────────────────────────────────────────────

public class AddressDto
{
    public int Id { get; set; }
    public string Label { get; set; } = "";
    public string FullName { get; set; } = "";
    public string PhoneNumber { get; set; } = "";
    public string AddressLine1 { get; set; } = "";
    public string? AddressLine2 { get; set; }
    public string City { get; set; } = "";
    public string Governorate { get; set; } = "";
    public string? PostalCode { get; set; }
    public bool IsDefault { get; set; }
}

public class CreateAddressRequest
{
    [Required, MaxLength(100)] public string Label { get; set; } = "Home";
    [Required, MaxLength(200)] public string FullName { get; set; } = "";
    [Required, MaxLength(20)] public string PhoneNumber { get; set; } = "";
    [Required, MaxLength(200)] public string AddressLine1 { get; set; } = "";
    [MaxLength(200)] public string? AddressLine2 { get; set; }
    [Required, MaxLength(100)] public string City { get; set; } = "";
    [Required, MaxLength(100)] public string Governorate { get; set; } = "";
    [MaxLength(20)] public string? PostalCode { get; set; }
    public bool IsDefault { get; set; } = false;
}

// ─── Coupon DTOs ─────────────────────────────────────────────────────────────

public class CouponDto
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string? Description { get; set; }
    public string DiscountType { get; set; } = "";
    public decimal DiscountValue { get; set; }
    public decimal? MinimumOrderAmount { get; set; }
    public decimal? MaximumDiscountAmount { get; set; }
    public int? UsageLimit { get; set; }
    public int UsedCount { get; set; }
    public DateTime? ValidFrom { get; set; }
    public DateTime? ValidTo { get; set; }
    public bool IsActive { get; set; }
}

public class CreateCouponRequest
{
    [Required, MaxLength(50)] public string Code { get; set; } = "";
    [MaxLength(200)] public string? Description { get; set; }
    public DiscountType DiscountType { get; set; }
    [Required, Range(0.01, double.MaxValue)] public decimal DiscountValue { get; set; }
    public decimal? MinimumOrderAmount { get; set; }
    public decimal? MaximumDiscountAmount { get; set; }
    public int? UsageLimit { get; set; }
    public int? UserUsageLimit { get; set; } = 1;
    public DateTime? ValidFrom { get; set; }
    public DateTime? ValidTo { get; set; }
    public bool IsActive { get; set; } = true;
}

public class ApplyCouponRequest
{
    [Required] public string Code { get; set; } = "";
    [Required, Range(0, double.MaxValue)] public decimal OrderAmount { get; set; }
}

public class CouponValidationResult
{
    public bool IsValid { get; set; }
    public string? Message { get; set; }
    public decimal DiscountAmount { get; set; }
    public CouponDto? Coupon { get; set; }
}

// ─── Dashboard DTOs ──────────────────────────────────────────────────────────

public class DashboardStatsDto
{
    public int TotalOrders { get; set; }
    public int PendingOrders { get; set; }
    public int TodayOrders { get; set; }
    public decimal TotalRevenue { get; set; }
    public decimal TodayRevenue { get; set; }
    public decimal MonthRevenue { get; set; }
    public int TotalProducts { get; set; }
    public int LowStockProducts { get; set; }
    public int OutOfStockProducts { get; set; }
    public int TotalCustomers { get; set; }
    public int NewCustomersThisMonth { get; set; }
    public List<RecentOrderDto> RecentOrders { get; set; } = new();
    public List<LowStockProductDto> LowStockAlerts { get; set; } = new();
    public List<MonthlyRevenueDto> MonthlyRevenue { get; set; } = new();
}

public class RecentOrderDto
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = "";
    public string CustomerName { get; set; } = "";
    public decimal Total { get; set; }
    public string Status { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}

public class LowStockProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int StockQuantity { get; set; }
    public int LowStockThreshold { get; set; }
    public string? PrimaryImage { get; set; }
}

public class MonthlyRevenueDto
{
    public string Month { get; set; } = "";
    public decimal Revenue { get; set; }
    public int OrderCount { get; set; }
}

// ─── Shared DTOs ─────────────────────────────────────────────────────────────

public class PagedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasNextPage => Page < TotalPages;
    public bool HasPrevPage => Page > 1;
}

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; } = "";
    public T? Data { get; set; }
    public List<string> Errors { get; set; } = new();

    public static ApiResponse<T> Ok(T data, string message = "Success") =>
        new() { Success = true, Data = data, Message = message };

    public static ApiResponse<T> Fail(string message, List<string>? errors = null) =>
        new() { Success = false, Message = message, Errors = errors ?? new() };
}

public class SettingDto
{
    public string Key { get; set; } = "";
    public string? Value { get; set; }
    public string? Group { get; set; }
}

public class UpdateSettingsRequest
{
    public Dictionary<string, string> Settings { get; set; } = new();
}
