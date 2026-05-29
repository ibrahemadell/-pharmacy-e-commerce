using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PharmacyAPI.Data;
using PharmacyAPI.DTOs;
using PharmacyAPI.Models;
using PharmacyAPI.Repositories.Interfaces;
using PharmacyAPI.Services.Interfaces;

namespace PharmacyAPI.Services;

// ─── Cart Service ─────────────────────────────────────────────────────────────

public class CartService : ICartService
{
    private readonly ICartRepository _cartRepo;
    private readonly IProductRepository _productRepo;
    private readonly ICouponRepository _couponRepo;
    private readonly ISettingRepository _settingRepo;
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public CartService(ICartRepository cartRepo, IProductRepository productRepo,
        ICouponRepository couponRepo, ISettingRepository settingRepo, IMapper mapper, AppDbContext db)
    {
        _cartRepo = cartRepo; _productRepo = productRepo; _couponRepo = couponRepo;
        _settingRepo = settingRepo; _mapper = mapper; _db = db;
    }

    public async Task<ApiResponse<CartDto>> GetCartAsync(int userId)
    {
        var items = await _cartRepo.GetUserCartAsync(userId);
        return ApiResponse<CartDto>.Ok(await BuildCartDtoAsync(items));
    }

    public async Task<ApiResponse<CartDto>> AddToCartAsync(int userId, AddToCartRequest req)
    {
        var product = await _productRepo.GetWithDetailsAsync(req.ProductId);
        if (product == null || !product.IsActive) return ApiResponse<CartDto>.Fail("Product not found");
        if (product.StockQuantity < req.Quantity) return ApiResponse<CartDto>.Fail("Insufficient stock");

        var existing = await _cartRepo.GetCartItemAsync(userId, req.ProductId, req.VariantId);
        if (existing != null)
        {
            var newQty = existing.Quantity + req.Quantity;
            if (product.StockQuantity < newQty) return ApiResponse<CartDto>.Fail("Insufficient stock");
            existing.Quantity = newQty;
            await _cartRepo.UpdateAsync(existing);
        }
        else
        {
            await _cartRepo.AddAsync(new CartItem
            {
                UserId = userId, ProductId = req.ProductId,
                VariantId = req.VariantId, Quantity = req.Quantity
            });
        }
        await _cartRepo.SaveChangesAsync();
        return await GetCartAsync(userId);
    }

    public async Task<ApiResponse<CartDto>> UpdateCartItemAsync(int userId, int cartItemId, UpdateCartItemRequest req)
    {
        var item = await _cartRepo.GetByIdAsync(cartItemId);
        if (item == null || item.UserId != userId) return ApiResponse<CartDto>.Fail("Cart item not found");

        if (req.Quantity == 0)
        {
            await _cartRepo.DeleteAsync(item);
        }
        else
        {
            var product = await _productRepo.GetByIdAsync(item.ProductId);
            if (product == null || product.StockQuantity < req.Quantity)
                return ApiResponse<CartDto>.Fail("Insufficient stock");
            item.Quantity = req.Quantity;
            await _cartRepo.UpdateAsync(item);
        }
        await _cartRepo.SaveChangesAsync();
        return await GetCartAsync(userId);
    }

    public async Task<ApiResponse<CartDto>> RemoveFromCartAsync(int userId, int cartItemId)
    {
        var item = await _cartRepo.GetByIdAsync(cartItemId);
        if (item == null || item.UserId != userId) return ApiResponse<CartDto>.Fail("Cart item not found");
        await _cartRepo.DeleteAsync(item);
        await _cartRepo.SaveChangesAsync();
        return await GetCartAsync(userId);
    }

    public async Task<ApiResponse<CartDto>> ClearCartAsync(int userId)
    {
        await _cartRepo.ClearCartAsync(userId);
        await _cartRepo.SaveChangesAsync();
        return ApiResponse<CartDto>.Ok(new CartDto(), "Cart cleared");
    }

    public async Task<ApiResponse<CouponValidationResult>> ValidateCouponAsync(int userId, ApplyCouponRequest req)
    {
        var coupon = await _couponRepo.GetByCodeAsync(req.Code);
        if (coupon == null) return ApiResponse<CouponValidationResult>.Ok(new CouponValidationResult { IsValid = false, Message = "Invalid coupon code" });
        if (!coupon.IsActive) return ApiResponse<CouponValidationResult>.Ok(new CouponValidationResult { IsValid = false, Message = "Coupon is inactive" });
        if (coupon.ValidFrom.HasValue && DateTime.UtcNow < coupon.ValidFrom)
            return ApiResponse<CouponValidationResult>.Ok(new CouponValidationResult { IsValid = false, Message = "Coupon not yet valid" });
        if (coupon.ValidTo.HasValue && DateTime.UtcNow > coupon.ValidTo)
            return ApiResponse<CouponValidationResult>.Ok(new CouponValidationResult { IsValid = false, Message = "Coupon expired" });
        if (coupon.UsageLimit.HasValue && coupon.UsedCount >= coupon.UsageLimit)
            return ApiResponse<CouponValidationResult>.Ok(new CouponValidationResult { IsValid = false, Message = "Coupon usage limit reached" });
        if (coupon.MinimumOrderAmount.HasValue && req.OrderAmount < coupon.MinimumOrderAmount)
            return ApiResponse<CouponValidationResult>.Ok(new CouponValidationResult { IsValid = false, Message = $"Minimum order amount is {coupon.MinimumOrderAmount}" });

        var userUsage = await _db.Orders.CountAsync(o => o.UserId == userId && o.CouponId == coupon.Id);
        if (coupon.UserUsageLimit.HasValue && userUsage >= coupon.UserUsageLimit)
            return ApiResponse<CouponValidationResult>.Ok(new CouponValidationResult { IsValid = false, Message = "You've already used this coupon" });

        decimal discount = coupon.DiscountType == DiscountType.Percentage
            ? req.OrderAmount * coupon.DiscountValue / 100
            : coupon.DiscountValue;

        if (coupon.MaximumDiscountAmount.HasValue)
            discount = Math.Min(discount, coupon.MaximumDiscountAmount.Value);

        return ApiResponse<CouponValidationResult>.Ok(new CouponValidationResult
        {
            IsValid = true, DiscountAmount = discount, Coupon = _mapper.Map<CouponDto>(coupon)
        });
    }

    private async Task<CartDto> BuildCartDtoAsync(List<CartItem> items)
    {
        var dtoItems = _mapper.Map<List<CartItemDto>>(items);
        var subTotal = dtoItems.Sum(i => i.LineTotal);
        var deliveryFeeStr = (await _settingRepo.GetByKeyAsync("delivery_fee"))?.Value ?? "25";
        var freeThresholdStr = (await _settingRepo.GetByKeyAsync("free_delivery_threshold"))?.Value ?? "300";
        decimal.TryParse(deliveryFeeStr, out var deliveryFee);
        decimal.TryParse(freeThresholdStr, out var freeThreshold);
        if (subTotal >= freeThreshold) deliveryFee = 0;

        return new CartDto
        {
            Items = dtoItems, SubTotal = subTotal, DeliveryFee = deliveryFee, Discount = 0,
            Total = subTotal + deliveryFee, ItemCount = dtoItems.Sum(i => i.Quantity),
            HasPrescriptionItems = dtoItems.Any(i => i.IsPrescriptionRequired)
        };
    }
}

// ─── Order Service ────────────────────────────────────────────────────────────

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepo;
    private readonly ICartRepository _cartRepo;
    private readonly IProductRepository _productRepo;
    private readonly ICouponRepository _couponRepo;
    private readonly ISettingRepository _settingRepo;
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public OrderService(IOrderRepository orderRepo, ICartRepository cartRepo, IProductRepository productRepo,
        ICouponRepository couponRepo, ISettingRepository settingRepo, IMapper mapper, AppDbContext db)
    {
        _orderRepo = orderRepo; _cartRepo = cartRepo; _productRepo = productRepo;
        _couponRepo = couponRepo; _settingRepo = settingRepo; _mapper = mapper; _db = db;
    }

    public async Task<ApiResponse<OrderDto>> CreateOrderAsync(int userId, CreateOrderRequest req)
    {
        var cartItems = await _cartRepo.GetUserCartAsync(userId);
        if (!cartItems.Any()) return ApiResponse<OrderDto>.Fail("Cart is empty");

        var address = await _db.Addresses.FirstOrDefaultAsync(a => a.Id == req.AddressId && a.UserId == userId);
        if (address == null) return ApiResponse<OrderDto>.Fail("Address not found");

        // Validate stock
        foreach (var item in cartItems)
        {
            var product = await _productRepo.GetByIdAsync(item.ProductId);
            if (product == null || product.StockQuantity < item.Quantity)
                return ApiResponse<OrderDto>.Fail($"Insufficient stock for {item.Product?.Name}");
        }

        // Calculate totals
        var subTotal = cartItems.Sum(i => (i.Product.DiscountPrice ?? i.Product.Price) * i.Quantity);
        var deliveryFeeStr = (await _settingRepo.GetByKeyAsync("delivery_fee"))?.Value ?? "25";
        var freeThresholdStr = (await _settingRepo.GetByKeyAsync("free_delivery_threshold"))?.Value ?? "300";
        decimal.TryParse(deliveryFeeStr, out var deliveryFee);
        decimal.TryParse(freeThresholdStr, out var freeThreshold);
        if (subTotal >= freeThreshold) deliveryFee = 0;

        decimal discount = 0;
        Coupon? coupon = null;
        if (!string.IsNullOrEmpty(req.CouponCode))
        {
            coupon = await _couponRepo.GetByCodeAsync(req.CouponCode);
            if (coupon != null && coupon.IsActive)
            {
                discount = coupon.DiscountType == DiscountType.Percentage
                    ? subTotal * coupon.DiscountValue / 100
                    : coupon.DiscountValue;
                if (coupon.MaximumDiscountAmount.HasValue)
                    discount = Math.Min(discount, coupon.MaximumDiscountAmount.Value);
                coupon.UsedCount++;
            }
        }

        var order = new Order
        {
            OrderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString()[..6].ToUpper()}",
            UserId = userId, AddressId = req.AddressId,
            PaymentMethod = req.PaymentMethod, Notes = req.Notes,
            PrescriptionImageUrl = req.PrescriptionImageUrl,
            SubTotal = subTotal, DeliveryFee = deliveryFee, Discount = discount,
            Total = subTotal + deliveryFee - discount,
            HasPrescriptionItems = cartItems.Any(i => i.Product.IsPrescriptionRequired),
            CouponId = coupon?.Id, Status = OrderStatus.Pending, PaymentStatus = PaymentStatus.Pending
        };

        order.Items = cartItems.Select(i => new OrderItem
        {
            ProductId = i.ProductId, ProductName = i.Product.Name,
            VariantId = i.VariantId, VariantName = i.Variant?.Name,
            Quantity = i.Quantity, UnitPrice = i.Product.DiscountPrice ?? i.Product.Price,
            TotalPrice = (i.Product.DiscountPrice ?? i.Product.Price) * i.Quantity
        }).ToList();

        order.StatusHistory = new List<OrderStatusHistory>
        {
            new() { Status = OrderStatus.Pending, Notes = "Order placed", ChangedByUserId = userId }
        };

        await _orderRepo.AddAsync(order);

        // Deduct stock
        foreach (var item in cartItems)
        {
            var product = await _productRepo.GetByIdAsync(item.ProductId);
            if (product != null)
            {
                var oldStock = product.StockQuantity;
                product.StockQuantity -= item.Quantity;
                _db.InventoryLogs.Add(new InventoryLog
                {
                    ProductId = item.ProductId, ActionType = InventoryActionType.OrderDeduction,
                    QuantityBefore = oldStock, QuantityChange = -item.Quantity,
                    QuantityAfter = product.StockQuantity, OrderId = order.Id
                });
            }
        }

        await _cartRepo.ClearCartAsync(userId);
        await _orderRepo.SaveChangesAsync();

        var created = await _orderRepo.GetWithDetailsAsync(order.Id);
        return ApiResponse<OrderDto>.Ok(_mapper.Map<OrderDto>(created!), "Order placed successfully");
    }

    public async Task<ApiResponse<OrderDto>> GetOrderAsync(int id, int? userId = null)
    {
        var order = await _orderRepo.GetWithDetailsAsync(id);
        if (order == null) return ApiResponse<OrderDto>.Fail("Order not found");
        if (userId.HasValue && order.UserId != userId)
            return ApiResponse<OrderDto>.Fail("Access denied");
        return ApiResponse<OrderDto>.Ok(_mapper.Map<OrderDto>(order));
    }

    public async Task<ApiResponse<PagedResult<OrderDto>>> GetOrdersAsync(int? userId, OrderStatus? status, int page, int pageSize)
    {
        var result = await _orderRepo.GetPagedAsync(userId, status, page, pageSize);
        var mapped = new PagedResult<OrderDto>
        {
            Items = _mapper.Map<List<OrderDto>>(result.Items),
            TotalCount = result.TotalCount, Page = result.Page, PageSize = result.PageSize
        };
        return ApiResponse<PagedResult<OrderDto>>.Ok(mapped);
    }

    public async Task<ApiResponse<OrderDto>> UpdateOrderStatusAsync(int id, UpdateOrderStatusRequest req, int adminUserId)
    {
        var order = await _orderRepo.GetWithDetailsAsync(id);
        if (order == null) return ApiResponse<OrderDto>.Fail("Order not found");

        order.Status = req.Status;
        order.UpdatedAt = DateTime.UtcNow;
        if (!string.IsNullOrEmpty(req.TrackingNumber)) order.TrackingNumber = req.TrackingNumber;
        if (req.Status == OrderStatus.Delivered)
        {
            order.DeliveredAt = DateTime.UtcNow;
            order.PaymentStatus = PaymentStatus.Paid;
        }

        order.StatusHistory.Add(new OrderStatusHistory
        {
            OrderId = id, Status = req.Status, Notes = req.Notes, ChangedByUserId = adminUserId
        });

        await _orderRepo.UpdateAsync(order);
        await _orderRepo.SaveChangesAsync();
        return ApiResponse<OrderDto>.Ok(_mapper.Map<OrderDto>(order), "Status updated");
    }

    public async Task<ApiResponse<bool>> CancelOrderAsync(int id, int userId)
    {
        var order = await _orderRepo.GetWithDetailsAsync(id);
        if (order == null) return ApiResponse<bool>.Fail("Order not found");
        if (order.UserId != userId) return ApiResponse<bool>.Fail("Access denied");
        if (order.Status != OrderStatus.Pending && order.Status != OrderStatus.Confirmed)
            return ApiResponse<bool>.Fail("Cannot cancel order at this stage");

        order.Status = OrderStatus.Cancelled;
        order.UpdatedAt = DateTime.UtcNow;
        order.StatusHistory.Add(new OrderStatusHistory { OrderId = id, Status = OrderStatus.Cancelled, Notes = "Cancelled by customer", ChangedByUserId = userId });

        // Restore stock
        foreach (var item in order.Items)
        {
            var product = await _productRepo.GetByIdAsync(item.ProductId);
            if (product != null)
            {
                var oldStock = product.StockQuantity;
                product.StockQuantity += item.Quantity;
                _db.InventoryLogs.Add(new InventoryLog
                {
                    ProductId = item.ProductId, ActionType = InventoryActionType.OrderReturn,
                    QuantityBefore = oldStock, QuantityChange = item.Quantity,
                    QuantityAfter = product.StockQuantity, OrderId = id
                });
            }
        }

        await _orderRepo.UpdateAsync(order);
        await _orderRepo.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Order cancelled");
    }
}

// ─── Category Service ──────────────────────────────────────────────────────────

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repo;
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public CategoryService(ICategoryRepository repo, IMapper mapper, AppDbContext db)
    {
        _repo = repo; _mapper = mapper; _db = db;
    }

    public async Task<ApiResponse<List<CategoryDto>>> GetAllAsync()
    {
        var categories = await _repo.GetWithChildrenAsync();
        return ApiResponse<List<CategoryDto>>.Ok(_mapper.Map<List<CategoryDto>>(categories));
    }

    public async Task<ApiResponse<CategoryDto>> GetByIdAsync(int id)
    {
        var c = await _db.Categories.Include(x => x.Children).Include(x => x.Products).Include(x => x.Parent)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (c == null) return ApiResponse<CategoryDto>.Fail("Category not found");
        return ApiResponse<CategoryDto>.Ok(_mapper.Map<CategoryDto>(c));
    }

    public async Task<ApiResponse<CategoryDto>> GetBySlugAsync(string slug)
    {
        var c = await _repo.GetBySlugAsync(slug);
        if (c == null) return ApiResponse<CategoryDto>.Fail("Category not found");
        return ApiResponse<CategoryDto>.Ok(_mapper.Map<CategoryDto>(c));
    }

    public async Task<ApiResponse<CategoryDto>> CreateAsync(CreateCategoryRequest req)
    {
        var category = _mapper.Map<Category>(req);
        category.Slug = await GenerateUniqueSlugAsync(req.Name);
        await _repo.AddAsync(category);
        await _repo.SaveChangesAsync();
        return ApiResponse<CategoryDto>.Ok(_mapper.Map<CategoryDto>(category), "Category created");
    }

    public async Task<ApiResponse<CategoryDto>> UpdateAsync(int id, UpdateCategoryRequest req)
    {
        var category = await _repo.GetByIdAsync(id);
        if (category == null) return ApiResponse<CategoryDto>.Fail("Category not found");
        _mapper.Map(req, category);
        await _repo.UpdateAsync(category);
        await _repo.SaveChangesAsync();
        return ApiResponse<CategoryDto>.Ok(_mapper.Map<CategoryDto>(category), "Category updated");
    }

    public async Task<ApiResponse<bool>> DeleteAsync(int id)
    {
        var category = await _repo.GetByIdAsync(id);
        if (category == null) return ApiResponse<bool>.Fail("Category not found");
        var hasProducts = await _db.Products.AnyAsync(p => p.CategoryId == id && p.IsActive);
        if (hasProducts) return ApiResponse<bool>.Fail("Category has active products");
        category.IsActive = false;
        await _repo.UpdateAsync(category);
        await _repo.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Category deleted");
    }

    private async Task<string> GenerateUniqueSlugAsync(string name)
    {
        var slug = Helpers.SlugHelper.GenerateSlug(name);
        var counter = 1;
        var candidate = slug;
        while (await _repo.SlugExistsAsync(candidate))
            candidate = $"{slug}-{counter++}";
        return candidate;
    }
}

// ─── Dashboard Service ─────────────────────────────────────────────────────────

public class DashboardService : IDashboardService
{
    private readonly IOrderRepository _orderRepo;

    public DashboardService(IOrderRepository orderRepo) => _orderRepo = orderRepo;

    public async Task<ApiResponse<DashboardStatsDto>> GetStatsAsync() =>
        ApiResponse<DashboardStatsDto>.Ok(await _orderRepo.GetDashboardStatsAsync());

    public async Task<ApiResponse<List<MonthlyRevenueDto>>> GetMonthlyRevenueAsync(int months) =>
        ApiResponse<List<MonthlyRevenueDto>>.Ok(await _orderRepo.GetMonthlyRevenueAsync(months));
}

// ─── Setting Service ──────────────────────────────────────────────────────────

public class SettingService : ISettingService
{
    private readonly ISettingRepository _repo;
    private readonly IMapper _mapper;

    public SettingService(ISettingRepository repo, IMapper mapper) { _repo = repo; _mapper = mapper; }

    public async Task<ApiResponse<List<SettingDto>>> GetAllAsync() =>
        ApiResponse<List<SettingDto>>.Ok(_mapper.Map<List<SettingDto>>(await _repo.GetAllAsync()));

    public async Task<ApiResponse<Dictionary<string, string?>>> GetByGroupAsync(string group)
    {
        var settings = await _repo.GetByGroupAsync(group);
        return ApiResponse<Dictionary<string, string?>>.Ok(settings.ToDictionary(s => s.Key, s => s.Value));
    }

    public async Task<ApiResponse<bool>> UpdateAsync(UpdateSettingsRequest req)
    {
        await _repo.BulkUpsertAsync(req.Settings);
        return ApiResponse<bool>.Ok(true, "Settings updated");
    }
}
