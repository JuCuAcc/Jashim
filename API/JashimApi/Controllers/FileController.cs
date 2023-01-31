using Microsoft.AspNetCore.Mvc;

namespace JashimApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("File is empty");

                if (file.Length > 10485760)
                    return BadRequest("File size exceeds 10 MB");

                if (!file.ContentType.Contains("pdf") && !file.ContentType.Contains("doc"))
                    return BadRequest("File type not supported");

                var path = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "Resume", file.FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok(new { file.FileName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


        //File Retrieve
        [HttpGet]
        [Route("AllFiles")]
        public IActionResult GetFiles()
        {
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "Resume");
            if (!Directory.Exists(folderPath))
            {
                return NotFound("Folder not found");
            }

            var files = Directory.GetFiles(folderPath);
            var fileList = new List<string>();
            foreach (var file in files)
            {
                fileList.Add(Path.GetFileName(file));
            }

            return Ok(fileList);
        }

        // File Download
        [HttpGet]
        [Route("FileDownload")]
        public IActionResult DownloadFile(string fileName)
        {
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "Resume");

            if (!Directory.Exists(folderPath))
            {
                return NotFound("Folder not found");
            }

            var filePath = Path.Combine(folderPath, fileName);
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found");
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;

            return File(memory, GetContentType(fileName), fileName);
        }



        [AcceptVerbs("Post")]
        public string[] GetFilesDetails()
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "Resume");
            return Directory.GetFiles(path);
        }


        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                    {".pdf", "application/pdf"},
                    {".doc", "application/vnd.ms-word"},
                    {".docx", "application/vnd.ms-word"},
                    {".xls", "application/vnd.ms-excel"},
                    {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
                    {".png", "image/png"},
                    {".jpg", "image/jpeg"},
                    {".jpeg", "image/jpeg"},
                    {".gif", "image/gif"},
                    {".csv", "text/csv"}
            };
        }
    }
}
