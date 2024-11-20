import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailsService {
  private apiUrl = 'https://aviation-edge.com/v2/public/timetable';
  private apiKey = 'cf9d09-a3ba7d';

  private majorAirports = [
    'JFK', 'LAX', 'LHR', 'DXB', 'HND', 'CDG', 'SIN',  // Original set
    'ORD', 'PEK', 'AMS', 'FRA', 'IST', 'MAD', 'BKK',  // Additional major hubs
    'SYD', 'YYZ', 'AUH', 'DOH', 'MUC', 'BCN'          // More variety
  ];

  constructor(private http: HttpClient) {}

  getFlightDetails(): Observable<any> {
    const selectedAirports = this.shuffleArray([...this.majorAirports])
      .slice(0, 5);

    console.log('Selected airports:', selectedAirports);
    const requests = selectedAirports.map(airport => 
      this.getFlightsByAirport(airport)
    );

    return forkJoin(requests).pipe(
      map(results => {
        const allFlights = results.flat();
        return this.shuffleArray(allFlights);
      }),
      catchError(this.handleError)
    );
  }

  getFlightsByRoute(fromIata: string, toIata: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    const params = {
      key: this.apiKey,
      type: 'departure',
      iataCode: fromIata,
    };

    console.log(`Requesting all flights from ${fromIata}`);

    return this.http.get(this.apiUrl, { headers, params }).pipe(
      tap(response => console.log('Raw API response:', response)),
      map((response: any) => {
        if (Array.isArray(response)) {
          const matchingFlights = response
            .filter(flight => flight.arrival?.iataCode === toIata)
            .map(flight => ({
              flight: {
                number: flight.flight?.number || flight.flight?.iataNumber,
                iata: flight.flight?.iataNumber,
                icao: flight.flight?.icaoNumber
              },
              airline: {
                name: flight.airline?.name,
                iata: flight.airline?.iataCode,
                icao: flight.airline?.icaoCode
              },
              departure: {
                iataCode: flight.departure?.iataCode,
                icaoCode: flight.departure?.icaoCode,
                terminal: flight.departure?.terminal,
                gate: flight.departure?.gate,
                scheduledTime: flight.departure?.scheduledTime,
                estimatedTime: flight.departure?.estimatedTime
              },
              arrival: {
                iataCode: flight.arrival?.iataCode,
                icaoCode: flight.arrival?.icaoCode,
                terminal: flight.arrival?.terminal,
                gate: flight.arrival?.gate,
                scheduledTime: flight.arrival?.scheduledTime,
                estimatedTime: flight.arrival?.estimatedTime
              },
              status: flight.status
            }));

          if (matchingFlights.length === 0) {
            console.log(`No direct flights found from ${fromIata} to ${toIata}`);
          }
          return matchingFlights;
        }
        throw new Error('Invalid response format');
      }),
      catchError(this.handleError)
    );
  }

  private getFlightsByAirport(iataCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    const params = {
      key: this.apiKey,
      type: 'departure',
      iataCode: iataCode
    };

    return this.http.get(this.apiUrl, { headers, params }).pipe(
      tap(response => console.log(`Flight Details API Response for ${iataCode}:`, response)),
      map((response: any) => {
        if (Array.isArray(response)) {
          return response.map(flight => ({
            flight: {
              number: flight.flight?.number || flight.flight?.iataNumber,
              iata: flight.flight?.iataNumber,
              icao: flight.flight?.icaoNumber
            },
            airline: {
              name: flight.airline?.name,
              iata: flight.airline?.iataCode,
              icao: flight.airline?.icaoCode
            },
            departure: {
              iataCode: flight.departure?.iataCode,
              icaoCode: flight.departure?.icaoCode,
              terminal: flight.departure?.terminal,
              gate: flight.departure?.gate,
              scheduledTime: flight.departure?.scheduledTime,
              estimatedTime: flight.departure?.estimatedTime
            },
            arrival: {
              iataCode: flight.arrival?.iataCode,
              icaoCode: flight.arrival?.icaoCode,
              terminal: flight.arrival?.terminal,
              gate: flight.arrival?.gate,
              scheduledTime: flight.arrival?.scheduledTime,
              estimatedTime: flight.arrival?.estimatedTime
            },
            status: flight.status
          }));
        }
        throw new Error('Invalid response format');
      })
    );
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private handleError(error: HttpErrorResponse | Error): Observable<never> {
    console.error('API Error details:', error);
    let errorMessage = 'An error occurred while fetching flight details.';
    
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof Error) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        
        if (error.status === 401) {
          errorMessage = 'Invalid API key or unauthorized access';
        } else if (error.status === 429) {
          errorMessage = 'API rate limit exceeded';
        } else if (error.status === 404) {
          errorMessage = 'Flight data not found';
        }
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return throwError(() => errorMessage);
  }
} 