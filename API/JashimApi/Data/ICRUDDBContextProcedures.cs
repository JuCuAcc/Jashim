using JashimApi.Models;

namespace JashimApi.Data
{
    public partial interface ICRUDDBContextProcedures
    {
        Task<int> DeletePersonAsync(int? Id, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<DeleteResumeFileResult>> DeleteResumeFileAsync(int? Id, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<GetAllPersonsResult>> GetAllPersonsAsync(OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<GetPersonByIdResult>> GetPersonByIdAsync(int? Id, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<GetResumeFileByIdResult>> GetResumeFileByIdAsync(int? Id, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<GetResumeFileByPersonIdResult>> GetResumeFileByPersonIdAsync(int? PersonId, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> InsertPersonAsync(string Name, int? CountryId, int? CityId, string LanguageSkills, DateTime? DateOfBirth, string ResumeFileName, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<List<InsertResumeFileResult>> InsertResumeFileAsync(int? PersonId, string FileName, byte[] FileContent, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> UpdatePersonAsync(int? Id, string Name, string CountryId, string CityId, string LanguageSkills, DateTime? DateOfBirth, string ResumeFileName, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
    }
}
