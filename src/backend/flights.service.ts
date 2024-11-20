import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

interface Flight {
  flight?: {
    iataNumber?: string;
    number?: string;
  };
  geography?: {
    latitude: number;
    longitude: number;
  };
  airline?: {
    iataCode?: string;
  };
}

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
    
    const params = {
      key: this.apiKey,
      limit: '500',
      // status: 'active'

    };

    return this.http.get(this.apiUrl, { headers, params }).pipe(
      tap(response => console.log('Raw API Response:', response)),
      catchError(this.handleError)
    );
  }

  searchSpecificFlight(flightNumber: string): Observable<any> {
    return this.getFlights().pipe(
      map((response: any) => {
        if (!Array.isArray(response)) {
          throw new Error('Invalid response format');
        }

        const match = flightNumber.match(/^([A-Za-z]+)(\d+)$/);
        if (!match) {
          console.log('Invalid flight number format');
          return [];
        }

        const [_, airlineCode, number] = match;
        console.log(`Searching for airline: ${airlineCode}, flight number: ${number}`);

        const matchingFlights = response.filter(flight => {
          const flightIata = flight.flight?.iataNumber?.toLowerCase();
          const flightAirline = flight.airline?.iataCode?.toLowerCase();
          const flightNum = flight.flight?.number;
          
          return flightIata === flightNumber.toLowerCase() ||
                 (flightAirline === airlineCode.toLowerCase() && flightNum === number);
        });

        console.log(`Found ${matchingFlights.length} matching flights`);
        return matchingFlights;
      }),
      catchError(error => {
        console.error('Search error:', error);
        return throwError(() => 'Failed to find flight. Please try again.');
      })
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => 'Failed to fetch data from the Aviation Edge API.');
  }
}
