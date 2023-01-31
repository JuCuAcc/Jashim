#nullable disable

namespace JashimApi.Models
{
    public partial class Country
    {
        public Country()
        {
            Cities = new HashSet<City>();
            People = new HashSet<Person>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<City> Cities { get; set; }
        public virtual ICollection<Person> People { get; set; }
    }
}