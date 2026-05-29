using PharmacyAPI.Services.Interfaces;

namespace PharmacyAPI.Services;

public class FileService : IFileService
{
    private readonly IWebHostEnvironment _env;
    private readonly IConfiguration _config;
    private readonly ILogger<FileService> _logger;

    private readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".webp", ".gif" };
    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB

    public FileService(IWebHostEnvironment env, IConfiguration config, ILogger<FileService> logger)
    {
        _env = env; _config = config; _logger = logger;
    }

    public async Task<string> SaveFileAsync(IFormFile file, string folder)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("File is empty");

        if (file.Length > MaxFileSizeBytes)
            throw new ArgumentException($"File exceeds maximum size of {MaxFileSizeBytes / 1024 / 1024}MB");

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!_allowedExtensions.Contains(ext))
            throw new ArgumentException($"File type {ext} is not allowed");

        var uploadRoot = Path.Combine(_env.WebRootPath, "uploads", folder);
        Directory.CreateDirectory(uploadRoot);

        var fileName = $"{Guid.NewGuid():N}{ext}";
        var fullPath = Path.Combine(uploadRoot, fileName);

        await using var stream = new FileStream(fullPath, FileMode.Create);
        await file.CopyToAsync(stream);

        _logger.LogInformation("File saved: {Path}", fullPath);
        return $"/uploads/{folder}/{fileName}";
    }

    public async Task<bool> DeleteFileAsync(string filePath)
    {
        if (string.IsNullOrEmpty(filePath)) return false;

        var fullPath = Path.Combine(_env.WebRootPath, filePath.TrimStart('/'));
        if (!File.Exists(fullPath)) return false;

        File.Delete(fullPath);
        _logger.LogInformation("File deleted: {Path}", fullPath);
        return await Task.FromResult(true);
    }
}
