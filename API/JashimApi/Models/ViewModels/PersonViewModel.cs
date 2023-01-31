#nullable disable

namespace JashimApi.Models.ViewModels
{
    public class PersonViewModel
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public int CityId { get; set; }
        public string LanguageSkills { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ResumeFileName { get; set; }

        public virtual City City { get; set; }
        public virtual Country Country { get; set; }

        public virtual ICollection<Language> Languages { get; set; }

        //[Required]
        public IFormFile ResumeFile { get; set; }
    }
}
