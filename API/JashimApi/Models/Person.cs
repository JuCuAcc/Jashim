
#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JashimApi.Models
{
    public partial class Person
    {
        public Person()
        {
            Languages = new HashSet<Language>();
        }

        [Key]
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

        [NotMapped]
        public IFormFile ResumeFile { get; set; }
    }
}