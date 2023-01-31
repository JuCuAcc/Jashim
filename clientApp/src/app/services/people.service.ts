import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from '../models/person.model';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  addPersonRequest: Person = {
    id: 0,
    name: '',
    countryId: 0,
    cityId: 0,
    languageSkills: '',
    dateOfBirth: new Date(),
    resumeFileName: '',
    languages: [],
    resumeFile: new File([], '')

  };

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private filUploadService: FileUploadService) { }

  getAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseApiUrl + '/api/people');
  }

  //addPerson(addPersonRequest: Person): Observable<Person> {
  //  //addPersonRequest.id = '00000000-0000-0000-0000-000000000000';
  //  addPersonRequest.id = 0;
  //  return this.http.post<Person>(this.baseApiUrl + '/api/people', addPersonRequest);

  //}
  
  addPerson(addPersonRequest: Person): Observable<Person> {
    addPersonRequest.id = 0;
    return this.http.post<Person>(this.baseApiUrl + '/api/people', addPersonRequest);

  }



  //addPerson(formData: FormData): Observable<any> {
  //  const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
  //  return this.http.post<any>(`${this.baseApiUrl}/api/people`, formData, { headers });
  //}

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(this.baseApiUrl + '/api/people/' + id);
  }

  updatePerson(id: number, updatePersonRequest: Person): Observable<Person> {
    return this.http.put<Person>(this.baseApiUrl + '/api/people/' + id, updatePersonRequest);
  }

  deletePerson(id: number): Observable<Person> {
    return this.http.delete<Person>(this.baseApiUrl + '/api/people/' + id);
  }

}
