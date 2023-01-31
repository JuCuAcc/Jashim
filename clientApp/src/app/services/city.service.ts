import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getCity(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/City/${id}`);
  }

  getCities(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/City`);
  }


  getCitiesByCountryId(id: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseApiUrl}/api/City/${id}`);
  }
}

