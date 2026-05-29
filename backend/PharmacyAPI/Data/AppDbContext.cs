using Microsoft.EntityFrameworkCore;
using PharmacyAPI.Models;

namespace PharmacyAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<ProductVariant> ProductVariants => Set<ProductVariant>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<OrderStatusHistory> OrderStatusHistories => Set<OrderStatusHistory>();
    public DbSet<Address> Addresses => Set<Address>();
    public DbSet<Coupon> Coupons => Set<Coupon>();
    public DbSet<InventoryLog> InventoryLogs => Set<InventoryLog>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Setting> Settings => Set<Setting>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        base.OnModelCreating(mb);

        // UserRole composite key
        mb.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });

        // User unique email
        mb.Entity<User>().HasIndex(u => u.Email).IsUnique();

        // Category self-referencing
        mb.Entity<Category>()
            .HasOne(c => c.Parent)
            .WithMany(c => c.Children)
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Product → Category
        mb.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        // Order → User
        mb.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Unique coupon code
        mb.Entity<Coupon>().HasIndex(c => c.Code).IsUnique();

        // Unique product slug
        mb.Entity<Product>().HasIndex(p => p.Slug).IsUnique();

        // Unique category slug
        mb.Entity<Category>().HasIndex(c => c.Slug).IsUnique();

        // Unique order number
        mb.Entity<Order>().HasIndex(o => o.OrderNumber).IsUnique();

        // Settings unique key
        mb.Entity<Setting>().HasIndex(s => s.Key).IsUnique();

        // Seed Roles
        mb.Entity<Role>().HasData(
            new Role { Id = 1, Name = "Admin", Description = "Full system access" },
            new Role { Id = 2, Name = "Customer", Description = "Regular customer" },
            new Role { Id = 3, Name = "Pharmacist", Description = "Pharmacy staff" }
        );

        // Seed default settings
        mb.Entity<Setting>().HasData(
            new Setting { Id = 1, Key = "pharmacy_name", Value = "PharmaCare", Group = "general" },
            new Setting { Id = 2, Key = "pharmacy_phone", Value = "+201000000000", Group = "general" },
            new Setting { Id = 3, Key = "pharmacy_whatsapp", Value = "+201000000000", Group = "general" },
            new Setting { Id = 4, Key = "pharmacy_email", Value = "info@pharmacare.com", Group = "general" },
            new Setting { Id = 5, Key = "pharmacy_address", Value = "Cairo, Egypt", Group = "general" },
            new Setting { Id = 6, Key = "delivery_fee", Value = "25", Group = "shipping" },
            new Setting { Id = 7, Key = "free_delivery_threshold", Value = "300", Group = "shipping" },
            new Setting { Id = 8, Key = "currency", Value = "EGP", Group = "general" },
            new Setting { Id = 9, Key = "hero_title", Value = "Your Health, Our Priority", Group = "homepage" },
            new Setting { Id = 10, Key = "hero_subtitle", Value = "Quality medicines delivered to your door", Group = "homepage" }
        );
    }
}
