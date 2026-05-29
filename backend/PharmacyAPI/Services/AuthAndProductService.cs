using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using PharmacyAPI.Data;
using PharmacyAPI.DTOs;
using PharmacyAPI.Helpers;
using PharmacyAPI.Models;
using PharmacyAPI.Repositories.Interfaces;
using PharmacyAPI.Services.Interfaces;

namespace PharmacyAPI.Services;

// ─── Auth Service ─────────────────────────────────────────────────────────────

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepo;
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;

    public AuthService(IUserRepository userRepo, AppDbContext db, IMapper mapper, IConfiguration config)
    {
        _userRepo = userRepo; _db = db; _mapper = mapper; _config = config;
    }

    public async Task<ApiResponse<AuthResponse>> RegisterAsync(RegisterRequest req)
    {
        if (await _userRepo.EmailExistsAsync(req.Email))
            return ApiResponse<AuthResponse>.Fail("Email already in use");

        var user = new User
        {
            FirstName = req.FirstName, LastName = req.LastName,
            Email = req.Email.ToLower(), PhoneNumber = req.PhoneNumber,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
            CreatedAt = DateTime.UtcNow, IsActive = true
        };

        await _userRepo.AddAsync(user);
        await _userRepo.SaveChangesAsync();

        // Assign Customer role
        var customerRole = await _db.Roles.FirstOrDefaultAsync(r => r.Name == "Customer");
        if (customerRole != null)
        {
            _db.UserRoles.Add(new UserRole { UserId = user.Id, RoleId = customerRole.Id });
            await _db.SaveChangesAsync();
        }

        var userWithRoles = await _userRepo.GetWithRolesAsync(user.Id);
        var roles = userWithRoles?.UserRoles.Select(ur => ur.Role.Name).ToList() ?? new();
        var token = GenerateJwtToken(user, roles);
        var userDto = _mapper.Map<UserDto>(userWithRoles);
        userDto.Roles = roles;

        return ApiResponse<AuthResponse>.Ok(new AuthResponse
        {
            Token = token, ExpiresAt = DateTime.UtcNow.AddDays(7),
            User = userDto, RefreshToken = Guid.NewGuid().ToString()
        }, "Registration successful");
    }

    public async Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest req)
    {
        var user = await _db.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Email.ToLower() == req.Email.ToLower());

        if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
            return ApiResponse<AuthResponse>.Fail("Invalid email or password");

        if (!user.IsActive)
            return ApiResponse<AuthResponse>.Fail("Account is deactivated");

        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var token = GenerateJwtToken(user, roles);
        var userDto = _mapper.Map<UserDto>(user);
        userDto.Roles = roles;

        return ApiResponse<AuthResponse>.Ok(new AuthResponse
        {
            Token = token, ExpiresAt = DateTime.UtcNow.AddDays(7),
            User = userDto, RefreshToken = Guid.NewGuid().ToString()
        }, "Login successful");
    }

    public async Task<ApiResponse<UserDto>> GetProfileAsync(int userId)
    {
        var user = await _userRepo.GetWithRolesAsync(userId);
        if (user == null) return ApiResponse<UserDto>.Fail("User not found");
        var dto = _mapper.Map<UserDto>(user);
        dto.Roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        return ApiResponse<UserDto>.Ok(dto);
    }

    public async Task<ApiResponse<UserDto>> UpdateProfileAsync(int userId, UpdateProfileRequest req)
    {
        var user = await _userRepo.GetWithRolesAsync(userId);
        if (user == null) return ApiResponse<UserDto>.Fail("User not found");
        user.FirstName = req.FirstName; user.LastName = req.LastName;
        user.PhoneNumber = req.PhoneNumber; user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user); await _userRepo.SaveChangesAsync();
        var dto = _mapper.Map<UserDto>(user);
        dto.Roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        return ApiResponse<UserDto>.Ok(dto, "Profile updated");
    }

    public async Task<ApiResponse<bool>> ChangePasswordAsync(int userId, ChangePasswordRequest req)
    {
        var user = await _userRepo.GetByIdAsync(userId);
        if (user == null) return ApiResponse<bool>.Fail("User not found");
        if (!BCrypt.Net.BCrypt.Verify(req.CurrentPassword, user.PasswordHash))
            return ApiResponse<bool>.Fail("Current password is incorrect");
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.NewPassword);
        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user); await _userRepo.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Password changed successfully");
    }

    public string GenerateJwtToken(User user, List<string> roles)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
        };
        claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

// ─── Product Service ───────────────────────────────────────────────────────────

public class ProductService : IProductService
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public ProductService(IProductRepository repo, IMapper mapper, AppDbContext db)
    {
        _repo = repo; _mapper = mapper; _db = db;
    }

    public async Task<ApiResponse<PagedResult<ProductListDto>>> GetProductsAsync(ProductFilterRequest filter)
    {
        var result = await _repo.GetPagedAsync(filter);
        var mapped = new PagedResult<ProductListDto>
        {
            Items = _mapper.Map<List<ProductListDto>>(result.Items),
            TotalCount = result.TotalCount, Page = result.Page, PageSize = result.PageSize
        };
        return ApiResponse<PagedResult<ProductListDto>>.Ok(mapped);
    }

    public async Task<ApiResponse<ProductDto>> GetProductAsync(int id)
    {
        var p = await _repo.GetWithDetailsAsync(id);
        if (p == null) return ApiResponse<ProductDto>.Fail("Product not found");
        return ApiResponse<ProductDto>.Ok(_mapper.Map<ProductDto>(p));
    }

    public async Task<ApiResponse<ProductDto>> GetProductBySlugAsync(string slug)
    {
        var p = await _repo.GetBySlugAsync(slug);
        if (p == null) return ApiResponse<ProductDto>.Fail("Product not found");
        return ApiResponse<ProductDto>.Ok(_mapper.Map<ProductDto>(p));
    }

    public async Task<ApiResponse<List<ProductListDto>>> GetFeaturedAsync() =>
        ApiResponse<List<ProductListDto>>.Ok(_mapper.Map<List<ProductListDto>>(await _repo.GetFeaturedAsync()));

    public async Task<ApiResponse<List<ProductListDto>>> GetBestSellersAsync() =>
        ApiResponse<List<ProductListDto>>.Ok(_mapper.Map<List<ProductListDto>>(await _repo.GetBestSellersAsync()));

    public async Task<ApiResponse<List<ProductListDto>>> GetOffersAsync() =>
        ApiResponse<List<ProductListDto>>.Ok(_mapper.Map<List<ProductListDto>>(await _repo.GetByOfferAsync()));

    public async Task<ApiResponse<List<ProductListDto>>> GetSimilarAsync(int productId)
    {
        var product = await _repo.GetByIdAsync(productId);
        if (product == null) return ApiResponse<List<ProductListDto>>.Fail("Product not found");
        return ApiResponse<List<ProductListDto>>.Ok(
            _mapper.Map<List<ProductListDto>>(await _repo.GetSimilarAsync(productId, product.CategoryId)));
    }

    public async Task<ApiResponse<ProductDto>> CreateProductAsync(CreateProductRequest req)
    {
        var product = _mapper.Map<Product>(req);
        product.Slug = await GenerateUniqueSlugAsync(req.Name);
        product.DiscountPercent = req.DiscountPrice.HasValue
            ? (int)Math.Round((req.Price - req.DiscountPrice.Value) / req.Price * 100)
            : 0;

        await _repo.AddAsync(product);
        await _repo.SaveChangesAsync();

        // Add initial inventory log
        if (req.StockQuantity > 0)
        {
            _db.InventoryLogs.Add(new InventoryLog
            {
                ProductId = product.Id, ActionType = InventoryActionType.StockIn,
                QuantityBefore = 0, QuantityChange = req.StockQuantity, QuantityAfter = req.StockQuantity,
                Notes = "Initial stock"
            });
            await _db.SaveChangesAsync();
        }

        var created = await _repo.GetWithDetailsAsync(product.Id);
        return ApiResponse<ProductDto>.Ok(_mapper.Map<ProductDto>(created!), "Product created");
    }

    public async Task<ApiResponse<ProductDto>> UpdateProductAsync(int id, UpdateProductRequest req)
    {
        var product = await _repo.GetWithDetailsAsync(id);
        if (product == null) return ApiResponse<ProductDto>.Fail("Product not found");

        var oldStock = product.StockQuantity;
        _mapper.Map(req, product);
        product.UpdatedAt = DateTime.UtcNow;
        product.DiscountPercent = req.DiscountPrice.HasValue
            ? (int)Math.Round((req.Price - req.DiscountPrice.Value) / req.Price * 100)
            : 0;

        // Update variants
        var existingVariantIds = product.Variants.Select(v => v.Id).ToHashSet();
        product.Variants.Clear();
        foreach (var vReq in req.Variants)
        {
            product.Variants.Add(new ProductVariant
            {
                ProductId = id, Name = vReq.Name, Value = vReq.Value,
                PriceModifier = vReq.PriceModifier, StockQuantity = vReq.StockQuantity
            });
        }

        if (oldStock != req.StockQuantity)
        {
            _db.InventoryLogs.Add(new InventoryLog
            {
                ProductId = id, ActionType = InventoryActionType.Adjustment,
                QuantityBefore = oldStock, QuantityChange = req.StockQuantity - oldStock,
                QuantityAfter = req.StockQuantity, Notes = "Manual adjustment via product update"
            });
        }

        await _repo.UpdateAsync(product);
        await _repo.SaveChangesAsync();
        return ApiResponse<ProductDto>.Ok(_mapper.Map<ProductDto>(product), "Product updated");
    }

    public async Task<ApiResponse<bool>> DeleteProductAsync(int id)
    {
        var product = await _repo.GetByIdAsync(id);
        if (product == null) return ApiResponse<bool>.Fail("Product not found");
        product.IsActive = false; // Soft delete
        await _repo.UpdateAsync(product);
        await _repo.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Product deleted");
    }

    public async Task<ApiResponse<bool>> UpdateStockAsync(int id, int quantity, string? notes, int? userId)
    {
        var product = await _repo.GetByIdAsync(id);
        if (product == null) return ApiResponse<bool>.Fail("Product not found");
        var oldStock = product.StockQuantity;
        product.StockQuantity = quantity;
        await _repo.UpdateAsync(product);

        _db.InventoryLogs.Add(new InventoryLog
        {
            ProductId = id, ActionType = InventoryActionType.Adjustment,
            QuantityBefore = oldStock, QuantityChange = quantity - oldStock,
            QuantityAfter = quantity, Notes = notes, CreatedByUserId = userId
        });
        await _repo.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Stock updated");
    }

    public async Task<ApiResponse<ProductImageDto>> AddProductImageAsync(int productId, string imageUrl, bool isPrimary)
    {
        var product = await _repo.GetByIdAsync(productId);
        if (product == null) return ApiResponse<ProductImageDto>.Fail("Product not found");

        if (isPrimary)
        {
            var existingImages = await _db.ProductImages.Where(i => i.ProductId == productId).ToListAsync();
            existingImages.ForEach(i => i.IsPrimary = false);
        }

        var image = new ProductImage { ProductId = productId, ImageUrl = imageUrl, IsPrimary = isPrimary };
        await _db.ProductImages.AddAsync(image);
        await _db.SaveChangesAsync();
        return ApiResponse<ProductImageDto>.Ok(_mapper.Map<ProductImageDto>(image));
    }

    public async Task<ApiResponse<bool>> DeleteProductImageAsync(int imageId)
    {
        var image = await _db.ProductImages.FindAsync(imageId);
        if (image == null) return ApiResponse<bool>.Fail("Image not found");
        _db.ProductImages.Remove(image);
        await _db.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true);
    }

    private async Task<string> GenerateUniqueSlugAsync(string name)
    {
        var slug = SlugHelper.GenerateSlug(name);
        var counter = 1;
        var candidate = slug;
        while (await _repo.SlugExistsAsync(candidate))
        {
            candidate = $"{slug}-{counter++}";
        }
        return candidate;
    }
}
