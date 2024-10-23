import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FlightService {
    private readonly API_URL = 'https://api.aviationstack.com/v1/flights';
    private readonly ACCESS_KEY = '46687c303df9f0b5ac6692e94a915c11';

    constructor(private http: HttpClient) { }
    
    getFlights(): Observable<any> {
        const params = {
          access_key: this.ACCESS_KEY
        };
    
        console.log('Requesting flight data from:', this.API_URL, 'with params:', params);
    
        return this.http.get(this.API_URL, { params }).pipe(
          map((response: any) => {
            console.log('API response:', response);
            // return response.data
            return response
          }),
          catchError(error => {
            console.error('Error fetching flight data:', error);
            return throwError(error);
          })
        );
    }
}