namespace JashimApi.Models
{
    public partial class GetPersonByIdResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public int CityId { get; set; }
        public string LanguageSkills { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ResumeFileName { get; set; }
    }
}
