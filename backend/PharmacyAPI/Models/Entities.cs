using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyAPI.Models;

// ─── User & Auth ────────────────────────────────────────────────────────────

public class User
{
    public int Id { get; set; }
    [Required, MaxLength(100)] public string FirstName { get; set; } = "";
    [Required, MaxLength(100)] public string LastName { get; set; } = "";
    [Required, MaxLength(200)] public string Email { get; set; } = "";
    [Required] public string PasswordHash { get; set; } = "";
    [MaxLength(20)] public string? PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsEmailVerified { get; set; } = false;
    public string? EmailVerificationToken { get; set; }
    public string? PasswordResetToken { get; set; }
    public DateTime? PasswordResetExpiry { get; set; }
    public string? ProfileImage { get; set; }

    // Navigation
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<Address> Addresses { get; set; } = new List<Address>();
    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}

public class Role
{
    public int Id { get; set; }
    [Required, MaxLength(50)] public string Name { get; set; } = "";
    [MaxLength(200)] public string? Description { get; set; }
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}

public class UserRole
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int RoleId { get; set; }
    public Role Role { get; set; } = null!;
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
}

// ─── Category ───────────────────────────────────────────────────────────────

public class Category
{
    public int Id { get; set; }
    [Required, MaxLength(100)] public string Name { get; set; } = "";
    [MaxLength(100)] public string? NameAr { get; set; }
    [MaxLength(100)] public string Slug { get; set; } = "";
    [MaxLength(500)] public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public int? ParentId { get; set; }
    public Category? Parent { get; set; }
    public ICollection<Category> Children { get; set; } = new List<Category>();
    public ICollection<Product> Products { get; set; } = new List<Product>();
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ─── Product ─────────────────────────────────────────────────────────────────

public class Product
{
    public int Id { get; set; }
    [Required, MaxLength(200)] public string Name { get; set; } = "";
    [MaxLength(200)] public string? NameAr { get; set; }
    [MaxLength(200)] public string Slug { get; set; } = "";
    [MaxLength(100)] public string? Barcode { get; set; }
    [MaxLength(2000)] public string? Description { get; set; }
    [MaxLength(2000)] public string? DescriptionAr { get; set; }
    [MaxLength(500)] public string? ShortDescription { get; set; }
    [MaxLength(500)] public string? ShortDescriptionAr { get; set; }

    [Column(TypeName = "decimal(18,2)")] public decimal Price { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal? DiscountPrice { get; set; }
    public int DiscountPercent { get; set; } = 0;

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    [MaxLength(100)] public string? Brand { get; set; }
    [MaxLength(100)] public string? Manufacturer { get; set; }
    [MaxLength(50)] public string? Unit { get; set; } // e.g. mg, ml, tablet

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

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
    public ICollection<InventoryLog> InventoryLogs { get; set; } = new List<InventoryLog>();
}

public class ProductImage
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    [Required] public string ImageUrl { get; set; } = "";
    public bool IsPrimary { get; set; } = false;
    public int SortOrder { get; set; } = 0;
    [MaxLength(200)] public string? AltText { get; set; }
}

public class ProductVariant
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    [MaxLength(100)] public string Name { get; set; } = ""; // e.g. "500mg", "1L"
    [MaxLength(100)] public string? Value { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal? PriceModifier { get; set; }
    public int StockQuantity { get; set; } = 0;
    public bool IsActive { get; set; } = true;
}

// ─── Cart ────────────────────────────────────────────────────────────────────

public class CartItem
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public int? VariantId { get; set; }
    public ProductVariant? Variant { get; set; }
    public int Quantity { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
}

// ─── Order ───────────────────────────────────────────────────────────────────

public enum OrderStatus
{
    Pending = 0,
    Confirmed = 1,
    Processing = 2,
    Shipped = 3,
    Delivered = 4,
    Cancelled = 5,
    Refunded = 6
}

public enum PaymentMethod
{
    CashOnDelivery = 0,
    OnlinePayment = 1,
    WhatsApp = 2
}

public enum PaymentStatus
{
    Pending = 0,
    Paid = 1,
    Failed = 2,
    Refunded = 3
}

public class Order
{
    public int Id { get; set; }
    [MaxLength(50)] public string OrderNumber { get; set; } = "";
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.CashOnDelivery;
    public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Pending;

    [Column(TypeName = "decimal(18,2)")] public decimal SubTotal { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal DeliveryFee { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal Discount { get; set; } = 0;
    [Column(TypeName = "decimal(18,2)")] public decimal Total { get; set; }

    public int? CouponId { get; set; }
    public Coupon? Coupon { get; set; }
    public int? AddressId { get; set; }
    public Address? Address { get; set; }

    [MaxLength(1000)] public string? Notes { get; set; }
    [MaxLength(500)] public string? AdminNotes { get; set; }
    public string? TrackingNumber { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeliveredAt { get; set; }

    public bool HasPrescriptionItems { get; set; } = false;
    public string? PrescriptionImageUrl { get; set; }

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    public ICollection<OrderStatusHistory> StatusHistory { get; set; } = new List<OrderStatusHistory>();
}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public int? VariantId { get; set; }
    [MaxLength(200)] public string ProductName { get; set; } = "";
    [MaxLength(100)] public string? VariantName { get; set; }
    public int Quantity { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal UnitPrice { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal TotalPrice { get; set; }
}

public class OrderStatusHistory
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public OrderStatus Status { get; set; }
    [MaxLength(500)] public string? Notes { get; set; }
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
    public int? ChangedByUserId { get; set; }
}

// ─── Address ─────────────────────────────────────────────────────────────────

public class Address
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    [MaxLength(100)] public string Label { get; set; } = "Home"; // Home, Work, Other
    [MaxLength(200)] public string FullName { get; set; } = "";
    [MaxLength(20)] public string PhoneNumber { get; set; } = "";
    [MaxLength(200)] public string AddressLine1 { get; set; } = "";
    [MaxLength(200)] public string? AddressLine2 { get; set; }
    [MaxLength(100)] public string City { get; set; } = "";
    [MaxLength(100)] public string Governorate { get; set; } = "";
    [MaxLength(20)] public string? PostalCode { get; set; }
    public bool IsDefault { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ─── Coupon ──────────────────────────────────────────────────────────────────

public enum DiscountType { Percentage, FixedAmount }

public class Coupon
{
    public int Id { get; set; }
    [Required, MaxLength(50)] public string Code { get; set; } = "";
    [MaxLength(200)] public string? Description { get; set; }
    public DiscountType DiscountType { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal DiscountValue { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal? MinimumOrderAmount { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal? MaximumDiscountAmount { get; set; }
    public int? UsageLimit { get; set; }
    public int UsedCount { get; set; } = 0;
    public int? UserUsageLimit { get; set; } = 1;
    public DateTime? ValidFrom { get; set; }
    public DateTime? ValidTo { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}

// ─── Inventory ───────────────────────────────────────────────────────────────

public enum InventoryActionType
{
    StockIn, StockOut, Adjustment, OrderDeduction, OrderReturn
}

public class InventoryLog
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public InventoryActionType ActionType { get; set; }
    public int QuantityBefore { get; set; }
    public int QuantityChange { get; set; }
    public int QuantityAfter { get; set; }
    [MaxLength(500)] public string? Notes { get; set; }
    public int? OrderId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int? CreatedByUserId { get; set; }
}

// ─── Review ──────────────────────────────────────────────────────────────────

public class Review
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int Rating { get; set; } // 1-5
    [MaxLength(1000)] public string? Comment { get; set; }
    public bool IsApproved { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ─── Settings ────────────────────────────────────────────────────────────────

public class Setting
{
    public int Id { get; set; }
    [Required, MaxLength(100)] public string Key { get; set; } = "";
    public string? Value { get; set; }
    [MaxLength(200)] public string? Description { get; set; }
    public string? Group { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
