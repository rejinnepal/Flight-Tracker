import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private apiUrl = 'https://aviation-edge.com/v2/public/flights'; // Aviation Edge endpoint
  private apiKey = 'cf9d09-a3ba7d'; // Replace with your actual Aviation Edge API key

  constructor(private http: HttpClient) {}

  // Method to fetch live flights data from Aviation Edge
  getFlights(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    // You can add parameters like `limit`, `airlineIata`, or `status` to the query
    const params = {
      key: this.apiKey,
      limit: '100'  // Optional: Limits the number of flight records returned
    };

    return this.http.get(this.apiUrl, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError('Failed to fetch data from the Aviation Edge API.');
  }
}
