#nullable disable

namespace JashimApi.Models
{
    public partial class Language
    {
        public Language()
        {
            People = new HashSet<Person>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Person> People { get; set; }
    }
}