import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/Country`);
  }


  getCountry(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/Country/${id}`);
  }

}
