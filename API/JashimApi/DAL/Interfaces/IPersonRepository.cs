using JashimApi.Models;

namespace JashimApi.DAL.Interfaces
{
    public interface IPersonRepository
    {
        Task<List<Person>> GetAllPeople();
        Task<Person> GetPersonById(int id);
        Task<List<Person>> SearchPeople(string searchString);
        Task<Person> AddPerson(Person person);
        Task<Person> UpdatePerson(Person person);
        Task DeletePerson(int id);
        Task<List<Language>> GetSelectedLanguages(int id);
    }
}
