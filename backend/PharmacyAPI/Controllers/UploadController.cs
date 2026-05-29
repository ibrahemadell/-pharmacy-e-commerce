using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PharmacyAPI.DTOs;
using PharmacyAPI.Services.Interfaces;

namespace PharmacyAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin,Pharmacist")]
public class UploadController : ControllerBase
{
    private readonly IFileService _fileService;

    public UploadController(IFileService fileService) => _fileService = fileService;

    /// <summary>Upload a product image</summary>
    [HttpPost("image")]
    [RequestSizeLimit(10 * 1024 * 1024)] // 10 MB limit
    public async Task<IActionResult> UploadImage(IFormFile file, [FromQuery] string folder = "products")
    {
        try
        {
            var url = await _fileService.SaveFileAsync(file, folder);
            return Ok(ApiResponse<object>.Ok(new { url }, "Image uploaded successfully"));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ApiResponse<bool>.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<bool>.Fail($"Upload failed: {ex.Message}"));
        }
    }

    /// <summary>Upload multiple images</summary>
    [HttpPost("images")]
    [RequestSizeLimit(50 * 1024 * 1024)]
    public async Task<IActionResult> UploadImages(IFormFileCollection files, [FromQuery] string folder = "products")
    {
        var urls = new List<string>();
        foreach (var file in files)
        {
            var url = await _fileService.SaveFileAsync(file, folder);
            urls.Add(url);
        }
        return Ok(ApiResponse<List<string>>.Ok(urls, $"{urls.Count} image(s) uploaded"));
    }

    /// <summary>Delete a file by its relative URL path</summary>
    [HttpDelete]
    public async Task<IActionResult> DeleteFile([FromQuery] string path)
    {
        var result = await _fileService.DeleteFileAsync(path);
        return Ok(ApiResponse<bool>.Ok(result, result ? "File deleted" : "File not found"));
    }
}
