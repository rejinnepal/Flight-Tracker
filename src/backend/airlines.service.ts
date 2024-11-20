import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirlinesService {
  private apiUrl = 'https://aviation-edge.com/v2/public/airlineDatabase';
  private apiKey = 'cf9d09-a3ba7d';

  constructor(private http: HttpClient) {}

  getAirlines(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    const params = {
      key: this.apiKey
    };

    return this.http.get(this.apiUrl, { headers, params }).pipe(
      tap(response => console.log('API Response:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error details:', error);
    let errorMessage = 'An error occurred while fetching airline data.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
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