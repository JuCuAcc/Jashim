using JashimApi.DAL.Interfaces;
using JashimApi.Models;
using JashimApi.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace JashimApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly IPersonRepository _repository;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public PeopleController(IPersonRepository repository, IWebHostEnvironment hostingEnvironment)
        {
            _repository = repository;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPeople()
        {
            var people = await _repository.GetAllPeople();
            return Ok(people);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPersonById(int id)
        {
            var person = await _repository.GetPersonById(id);
            if (person == null)
            {
                return NotFound();
            }
            return Ok(person);
        }

        [HttpGet]
        [Route("SearchPerson")]
        public async Task<IActionResult> SearchPeople(string searchString)
        {
            var people = await _repository.SearchPeople(searchString);
            return Ok(people);
        }

        [HttpPost]
        public async Task<IActionResult> AddPerson([FromForm] PersonViewModel model)
        {
            // Validate the model and save the person
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map the view model properties to the person entity
            var person = new Person
            {
                Name = model.Name,
                CountryId = model.CountryId,
                CityId = model.CityId,
                LanguageSkills = model.LanguageSkills,
                DateOfBirth = model.DateOfBirth
            };

            // If a new file was provided, save it to a file and set the file name on the person entity
            if (model.ResumeFile != null && model.ResumeFile.Length > 0)
            {
                // Generate a unique file name
                //var fileName = "person-" + Guid.NewGuid().ToString() + Path.GetExtension(model.ResumeFile.FileName);
                var fileName = "person-" + model.Id + "-" + Path.GetFileNameWithoutExtension(model.ResumeFile.FileName) + Path.GetExtension(model.ResumeFile.FileName);

                // Save the image to a file
                using (var stream = new FileStream(Path.Combine(@"wwwroot/Resume", fileName), FileMode.Create))
                {
                    await model.ResumeFile.CopyToAsync(stream);
                }

                person.ResumeFileName = fileName;
            }
            else
            {
                // Set a default image if no file was provided
                person.ResumeFileName = "default.pdf";
            }

            person = await _repository.AddPerson(person);
            return CreatedAtAction(nameof(GetPersonById), new { id = person.Id }, person);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePerson(int id, [FromForm] PersonViewModel model)
        {
            // Validate the model and update the person
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = await _repository.GetPersonById(id);
            if (person == null)
            {
                return NotFound();
            }

            // Map the view model properties to the person entity
            person.Name = model.Name;
            person.CountryId = model.CountryId;
            person.CityId = model.CityId;
            person.LanguageSkills = model.LanguageSkills;
            person.DateOfBirth = model.DateOfBirth;

            // If a new image was provided, save it to a file and set the file name on the person entity
            if (model.ResumeFile != null && model.ResumeFile.Length > 0)
            {
                // Generate a unique file name
                //var fileName = "person-" + person.Id + "-" + Guid.NewGuid().ToString() + Path.GetExtension(model.ResumeFile.FileName);
                var fileName = "person-" + person.Id + "-" + Path.GetFileNameWithoutExtension(model.ResumeFile.FileName) + Path.GetExtension(model.ResumeFile.FileName);

                // Save the image to a file
                using (var stream = new FileStream(Path.Combine(@"wwwroot/Resume", fileName), FileMode.Create))
                {
                    await model.ResumeFile.CopyToAsync(stream);
                }

                // Delete the old image file from the uploads folder
                if (System.IO.File.Exists(Path.Combine(@"wwwroot/Resume", person.ResumeFileName)))
                {
                    System.IO.File.Delete(Path.Combine(@"wwwroot/Resume", person.ResumeFileName));
                }

                // Set the new image file name on the person entity
                person.ResumeFileName = fileName;
            }

            person = await _repository.UpdatePerson(person);
            return Ok(person);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            var person = await _repository.GetPersonById(id);
            if (person == null)
            {
                return NotFound();
            }

            // Delete the person entity and the corresponding resume file from the Resume folder
            await _repository.DeletePerson(id);
            if (System.IO.File.Exists(Path.Combine(@"wwwroot/Resume", person.ResumeFileName)))
            {
                System.IO.File.Delete(Path.Combine(@"wwwroot/Resume", person.ResumeFileName));
            }

            return NoContent();
        }


        [HttpGet("{id}/languages")]
        public async Task<ActionResult<IEnumerable<Language>>> GetSelectedLanguagesAsync(int id)
        {
            try
            {
                var selectedLanguages = await _repository.GetSelectedLanguages(id);
                return Ok(selectedLanguages);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
