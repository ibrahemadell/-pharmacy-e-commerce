using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Text.Json;
using Serilog;

namespace PharmacyAPI.Helpers;

public static class SlugHelper
{
    public static string GenerateSlug(string text)
    {
        text = text.ToLowerInvariant().Trim();
        text = Regex.Replace(text, @"[^a-z0-9\s-]", "");
        text = Regex.Replace(text, @"\s+", "-");
        text = Regex.Replace(text, @"-+", "-");
        return text.Trim('-');
    }
}

namespace PharmacyAPI.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next; _logger = logger;
    }

    public async Task InvokeAsync(HttpContext ctx)
    {
        try
        {
            await _next(ctx);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
            ctx.Response.ContentType = "application/json";
            ctx.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = new { success = false, message = "An internal error occurred", error = ex.Message };
            await ctx.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}

namespace PharmacyAPI.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Repositories
        services.AddScoped<Repositories.Interfaces.IUserRepository, Repositories.UserRepository>();
        services.AddScoped<Repositories.Interfaces.IProductRepository, Repositories.ProductRepository>();
        services.AddScoped<Repositories.Interfaces.ICategoryRepository, Repositories.CategoryRepository>();
        services.AddScoped<Repositories.Interfaces.IOrderRepository, Repositories.OrderRepository>();
        services.AddScoped<Repositories.Interfaces.ICartRepository, Repositories.CartRepository>();
        services.AddScoped<Repositories.Interfaces.ICouponRepository, Repositories.CouponRepository>();
        services.AddScoped<Repositories.Interfaces.ISettingRepository, Repositories.SettingRepository>();

        // Services
        services.AddScoped<Services.Interfaces.IFileService, Services.FileService>();
        services.AddScoped<Services.Interfaces.IAuthService, Services.AuthService>();
        services.AddScoped<Services.Interfaces.IProductService, Services.ProductService>();
        services.AddScoped<Services.Interfaces.ICategoryService, Services.CategoryService>();
        services.AddScoped<Services.Interfaces.ICartService, Services.CartService>();
        services.AddScoped<Services.Interfaces.IOrderService, Services.OrderService>();
        services.AddScoped<Services.Interfaces.IDashboardService, Services.DashboardService>();
        services.AddScoped<Services.Interfaces.ISettingService, Services.SettingService>();

        return services;
    }
}
