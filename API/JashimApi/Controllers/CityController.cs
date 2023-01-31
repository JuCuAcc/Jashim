using JashimApi.Data;
using JashimApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JashimApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly CRUDDBContext _context;

        public CityController(CRUDDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetCities()
        {
            return await _context.Cities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCitiesByCountryId(int id)
        {
            var cities = await _context.Cities.Where(x => x.CountryId == id).ToListAsync();
            return Ok(cities);
        }
    }

}
