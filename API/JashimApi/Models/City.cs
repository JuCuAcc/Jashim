#nullable disable

using System.ComponentModel.DataAnnotations;

namespace JashimApi.Models
{
    public partial class City
    {
        public City()
        {
            People = new HashSet<Person>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "City name is required")]
        [StringLength(100, ErrorMessage = "City name must be between 3 and 100 characters", MinimumLength = 3)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Country Id is required")]
        public int CountryId { get; set; }

        public virtual Country Country { get; set; }
        public virtual ICollection<Person> People { get; set; }
    }
}
