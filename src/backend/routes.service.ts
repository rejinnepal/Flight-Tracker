import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private apiUrl = 'https://aviation-edge.com/v2/public/routes';
  private apiKey = 'cf9d09-a3ba7d';

  constructor(private http: HttpClient) {}

  getFlightRoute(flight: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    const params: any = {
      key: this.apiKey
    };

    // Add parameters if they exist
    if (flight.departure?.iataCode) {
      params.departureIata = flight.departure.iataCode;
    }
    if (flight.departure?.icaoCode) {
      params.departureIcao = flight.departure.icaoCode;
    }
    if (flight.airline?.iataCode) {
      params.airlineIata = flight.airline.iataCode;
    }
    if (flight.airline?.icaoCode) {
      params.airlineIcao = flight.airline.icaoCode;
    }
    if (flight.flight?.number) {
      params.flightNumber = flight.flight.number;
    }

    return this.http.get(this.apiUrl, { headers, params }).pipe(
      tap(response => console.log('Route API Response:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error details:', error);
    let errorMessage = 'An error occurred while fetching route data.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      if (error.status === 401) {
        errorMessage = 'Invalid API key or unauthorized access';
      } else if (error.status === 429) {
        errorMessage = 'API rate limit exceeded';
      }
    }
    
    return throwError(() => errorMessage);
  }
} 