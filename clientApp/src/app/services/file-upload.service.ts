import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //http://localhost:5042/api/File/upload
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
   
    const formData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders();
    console.log(headers);
    headers.append('Content-Type', 'multipart/form-data');

    const request = new HttpRequest('POST', this.baseApiUrl + '/api/File/upload', formData, {
      headers: headers,
      reportProgress: true,
    });

    return this.http.request(request);
  }
}
