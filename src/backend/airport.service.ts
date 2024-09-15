import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private apiUrl = 'https://airportdb.io/api/v1/airport';
  private apiToken = 'e038b657c6ca2cf3491b83702995b10b8d32c5dd8175464e1925fdaef7f3bf16a5e7e26a69a3f9c9d95323eb95149558';

  constructor(private http: HttpClient) { }

  getAirports(): Observable<any> {
    return this.http.get(`${this.apiUrl}/airports`);
  }

  getAirportByCode(code: string): Observable<any> {
    const url = `${this.apiUrl}/${code}?apiToken=${this.apiToken}`;
    return this.http.get(url);
  }
}