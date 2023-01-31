using JashimApi.DAL.Interfaces;
using JashimApi.Data;
using JashimApi.Models;
using Microsoft.EntityFrameworkCore;

namespace JashimApi.DAL.Repositories
{
    public class PersonRepository : IPersonRepository
    {

        private readonly CRUDDBContext _dbContext;
        private readonly string files = "";

        public PersonRepository(CRUDDBContext dbContext, IWebHostEnvironment hostingEnvironment)
        {
            this._dbContext = dbContext;

            if (hostingEnvironment != null && hostingEnvironment.WebRootPath != null)
            {
                this.files = Path.Combine(hostingEnvironment.WebRootPath, "Resume");
            }

        }

        public async Task<Person> AddPerson(Person person)
        {
            _dbContext.People.Add(person);
            await _dbContext.SaveChangesAsync();
            return person;
        }

        public async Task DeletePerson(int id)
        {
            var person = await _dbContext.People.FindAsync(id);
            if (person != null)
            {
                _dbContext.People.Remove(person);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<Person>> GetAllPeople()
        {
            return await _dbContext.People.ToListAsync();
        }

        public async Task<Person> GetPersonById(int id)
        {
            return await _dbContext.People.FindAsync(id);
        }

        //public async Task<List<Language>> GetSelectedLanguagesAsync(int id)
        //{
        //    var person = await _dbContext.People
        //        .Include(p => p.Languages)
        //        .FirstOrDefaultAsync(p => p.Id == id);

        //    if (person == null)
        //    {
        //        throw new ArgumentException($"Person with id {id} not found");
        //    }

        //    var selectedLanguageIds = person.LanguageSkills.Split(',')
        //        .Select(int.Parse);

        //    var selectedLanguages = person.Languages
        //        .Where(language => selectedLanguageIds.Contains(language.Id))
        //        .ToList();

        //    return selectedLanguages;
        //}

        public async Task<List<Language>> GetSelectedLanguages(int id)
        {
            var person = await _dbContext.People
                .Include(p => p.Languages)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (person == null)
            {
                throw new ArgumentException($"Person with id {id} not found");
            }

            var selectedLanguageIds = person.LanguageSkills.Split(',');

            var selectedLanguages = new List<Language>();
            foreach (var idString in selectedLanguageIds)
            {
                if (int.TryParse(idString, out int languageId))
                {
                    var language = person.Languages.FirstOrDefault(l => l.Id == languageId);
                    if (language != null)
                    {
                        selectedLanguages.Add(language);
                    }
                }
            }

            return selectedLanguages;
        }

        public async Task<List<Person>> SearchPeople(string searchString)
        {
            var people = from p in _dbContext.People
                         select p;

            if (!String.IsNullOrEmpty(searchString))
            {
                people = people.Where(p => p.Name.Contains(searchString) || p.ResumeFileName.Contains(searchString));
            }

            return await people.ToListAsync();
        }

        public async Task<Person> UpdatePerson(Person person)
        {
            _dbContext.People.Update(person);
            await _dbContext.SaveChangesAsync();
            return person;
        }


    }
}
