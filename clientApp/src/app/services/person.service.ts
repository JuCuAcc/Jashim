import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  apiUrl = 'http://localhost:5042/api/People';

  constructor(private http: HttpClient) { }

  savePerson(person: Person) {
    const formData = new FormData();
    formData.append('Name', person.name);
    formData.append('CountryId', person.countryId.toString());
    formData.append('CityId', person.cityId.toString());
    formData.append('LanguageSkills', person.languageSkills);
    formData.append('DateOfBirth', person.dateOfBirth.toString());
    formData.append('ResumeFile', person.resumeFile);

    return this.http.post<Person>(this.apiUrl, formData);
  }
}
