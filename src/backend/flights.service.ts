import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private apiUrl = 'https://aviation-edge.com/v2/public/flights';
  private apiKey = 'cf9d09-a3ba7d';

  constructor(private http: HttpClient) {}

  getFlights(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    // We can add parameters like `limit`, `airlineIata`, or `status` to the query
    const params = {
      key: this.apiKey,
      limit: '1000'
    };

    return this.http.get(this.apiUrl, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError('Failed to fetch data from the Aviation Edge API.');
  }
}
