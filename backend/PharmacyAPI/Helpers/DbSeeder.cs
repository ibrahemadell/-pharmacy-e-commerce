using Microsoft.EntityFrameworkCore;
using PharmacyAPI.Data;
using PharmacyAPI.Models;

namespace PharmacyAPI.Helpers;

/// <summary>Seeds the database with an admin user on first run.</summary>
public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db     = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

        try
        {
            await db.Database.MigrateAsync();

            // Seed admin user if not exists
            if (!await db.Users.AnyAsync(u => u.Email == "admin@pharmacare.com"))
            {
                var adminRole = await db.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");
                if (adminRole == null)
                {
                    adminRole = new Role { Name = "Admin", Description = "Full system access" };
                    await db.Roles.AddAsync(adminRole);
                    await db.SaveChangesAsync();
                }

                var admin = new User
                {
                    FirstName         = "Admin",
                    LastName          = "User",
                    Email             = "admin@pharmacare.com",
                    PasswordHash      = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                    PhoneNumber       = "+201000000000",
                    IsActive          = true,
                    IsEmailVerified   = true,
                    CreatedAt         = DateTime.UtcNow,
                };

                await db.Users.AddAsync(admin);
                await db.SaveChangesAsync();

                db.UserRoles.Add(new UserRole { UserId = admin.Id, RoleId = adminRole.Id });
                await db.SaveChangesAsync();

                logger.LogInformation("Admin user seeded: admin@pharmacare.com / Admin@123");
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Database seeding failed");
        }
    }
}
