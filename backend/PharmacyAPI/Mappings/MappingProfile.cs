using AutoMapper;
using PharmacyAPI.DTOs;
using PharmacyAPI.Models;

namespace PharmacyAPI.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User
        CreateMap<User, UserDto>()
            .ForMember(d => d.Roles, o => o.MapFrom(s =>
                s.UserRoles.Select(ur => ur.Role.Name).ToList()));

        // Category
        CreateMap<Category, CategoryDto>()
            .ForMember(d => d.ParentName, o => o.MapFrom(s => s.Parent != null ? s.Parent.Name : null))
            .ForMember(d => d.ProductCount, o => o.MapFrom(s => s.Products.Count(p => p.IsActive)));
        CreateMap<CreateCategoryRequest, Category>()
            .ForMember(d => d.Slug, o => o.Ignore());

        // Product
        CreateMap<Product, ProductDto>()
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Category.Name))
            .ForMember(d => d.IsLowStock, o => o.MapFrom(s => s.StockQuantity <= s.LowStockThreshold && s.StockQuantity > 0))
            .ForMember(d => d.IsOutOfStock, o => o.MapFrom(s => s.StockQuantity == 0))
            .ForMember(d => d.PrimaryImage, o => o.MapFrom(s =>
                s.Images.OrderBy(i => i.SortOrder).FirstOrDefault(i => i.IsPrimary) != null
                    ? s.Images.OrderBy(i => i.SortOrder).First(i => i.IsPrimary).ImageUrl
                    : s.Images.OrderBy(i => i.SortOrder).Select(i => i.ImageUrl).FirstOrDefault()))
            .ForMember(d => d.AverageRating, o => o.MapFrom(s =>
                s.Reviews.Any(r => r.IsApproved) ? s.Reviews.Where(r => r.IsApproved).Average(r => r.Rating) : 0))
            .ForMember(d => d.ReviewCount, o => o.MapFrom(s => s.Reviews.Count(r => r.IsApproved)));

        CreateMap<Product, ProductListDto>()
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Category.Name))
            .ForMember(d => d.IsLowStock, o => o.MapFrom(s => s.StockQuantity <= s.LowStockThreshold && s.StockQuantity > 0))
            .ForMember(d => d.IsOutOfStock, o => o.MapFrom(s => s.StockQuantity == 0))
            .ForMember(d => d.PrimaryImage, o => o.MapFrom(s =>
                s.Images.OrderBy(i => i.SortOrder).FirstOrDefault(i => i.IsPrimary) != null
                    ? s.Images.OrderBy(i => i.SortOrder).First(i => i.IsPrimary).ImageUrl
                    : s.Images.OrderBy(i => i.SortOrder).Select(i => i.ImageUrl).FirstOrDefault()))
            .ForMember(d => d.AverageRating, o => o.MapFrom(s =>
                s.Reviews.Any(r => r.IsApproved) ? s.Reviews.Where(r => r.IsApproved).Average(r => r.Rating) : 0))
            .ForMember(d => d.ReviewCount, o => o.MapFrom(s => s.Reviews.Count(r => r.IsApproved)));

        CreateMap<ProductImage, ProductImageDto>();
        CreateMap<ProductVariant, ProductVariantDto>();
        CreateMap<CreateProductRequest, Product>().ForMember(d => d.Slug, o => o.Ignore());

        // Cart
        CreateMap<CartItem, CartItemDto>()
            .ForMember(d => d.ProductName, o => o.MapFrom(s => s.Product.Name))
            .ForMember(d => d.ProductSlug, o => o.MapFrom(s => s.Product.Slug))
            .ForMember(d => d.ProductImage, o => o.MapFrom(s =>
                s.Product.Images.OrderBy(i => i.SortOrder).FirstOrDefault(i => i.IsPrimary) != null
                    ? s.Product.Images.OrderBy(i => i.SortOrder).First(i => i.IsPrimary).ImageUrl
                    : s.Product.Images.OrderBy(i => i.SortOrder).Select(i => i.ImageUrl).FirstOrDefault()))
            .ForMember(d => d.UnitPrice, o => o.MapFrom(s => s.Product.Price))
            .ForMember(d => d.DiscountPrice, o => o.MapFrom(s => s.Product.DiscountPrice))
            .ForMember(d => d.MaxQuantity, o => o.MapFrom(s => s.Product.StockQuantity))
            .ForMember(d => d.LineTotal, o => o.MapFrom(s =>
                (s.Product.DiscountPrice ?? s.Product.Price) * s.Quantity))
            .ForMember(d => d.IsPrescriptionRequired, o => o.MapFrom(s => s.Product.IsPrescriptionRequired))
            .ForMember(d => d.VariantName, o => o.MapFrom(s => s.Variant != null ? s.Variant.Name : null));

        // Order
        CreateMap<Order, OrderDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.PaymentMethod, o => o.MapFrom(s => s.PaymentMethod.ToString()))
            .ForMember(d => d.PaymentStatus, o => o.MapFrom(s => s.PaymentStatus.ToString()))
            .ForMember(d => d.CouponCode, o => o.MapFrom(s => s.Coupon != null ? s.Coupon.Code : null));

        CreateMap<OrderItem, OrderItemDto>();
        CreateMap<OrderStatusHistory, OrderStatusHistoryDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()));

        // Address
        CreateMap<Address, AddressDto>();
        CreateMap<CreateAddressRequest, Address>();

        // Coupon
        CreateMap<Coupon, CouponDto>()
            .ForMember(d => d.DiscountType, o => o.MapFrom(s => s.DiscountType.ToString()));
        CreateMap<CreateCouponRequest, Coupon>();

        // Setting
        CreateMap<Setting, SettingDto>();
    }
}
