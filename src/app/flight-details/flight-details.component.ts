import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightDetailsService } from '../../backend/flight-details.service';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  flights: any[] = [];
  filteredFlights: any[] = [];
  searchCode: string = '';
  fromAirport: string = '';
  toAirport: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  Math = Math;
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedWeek: number = this.getCurrentWeek();

  constructor(
    private flightDetailsService: FlightDetailsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFlights();
  }

  loadFlights(): void {
    this.isLoading = true;
    this.flightDetailsService.getFlightDetails().subscribe({
      next: (data: any) => {
        console.log('Raw API response:', data);
        if (Array.isArray(data)) {
          this.flights = data;
        } else if (data.data && Array.isArray(data.data)) {
          this.flights = data.data;
        } else {
          console.error('Unexpected API response format:', data);
          this.errorMessage = 'Invalid data format received from API';
        }
        this.filteredFlights = this.flights;
        this.isLoading = false;
      },
      error: (error: Error) => {
        console.error('Error loading flights data:', error);
        this.errorMessage = 'Failed to load flights data. ' + (error.message || '');
        this.isLoading = false;
      }
    });
  }

  searchFlights(): void {
    if (!this.searchCode) {
      this.filteredFlights = this.flights;
      this.errorMessage = '';
      return;
    }
    
    const searchValue = this.searchCode.toLowerCase();
    this.filteredFlights = this.flights.filter(flight => {
      return (
        flight.flight?.number?.toLowerCase().includes(searchValue) ||
        flight.departure?.iataCode?.toLowerCase().includes(searchValue) ||
        flight.arrival?.iataCode?.toLowerCase().includes(searchValue) ||
        flight.airline?.name?.toLowerCase().includes(searchValue)
      );
    });

    if (this.filteredFlights.length === 0) {
      this.errorMessage = `No flights found matching "${this.searchCode}"`;
    } else {
      this.errorMessage = '';
    }
    
    this.currentPage = 1;
  }

  paginateFlights(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredFlights.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredFlights.length / this.itemsPerPage);
  }

  getPaginationRange(): number[] {
    const totalPages = this.getTotalPages();
    const current = this.currentPage;
    const range: number[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      range.push(1);
      
      if (current > 3) {
        range.push(-1);
      }
      
      for (let i = Math.max(2, current - 1); i <= Math.min(current + 1, totalPages - 1); i++) {
        range.push(i);
      }
      
      if (current < totalPages - 2) {
        range.push(-1);
      }
      
      range.push(totalPages);
    }
    
    return range;
  }

  formatTime(dateString: string): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success';
      case 'scheduled':
        return 'bg-warning text-dark';
      case 'delayed':
        return 'bg-warning';
      case 'cancelled':
        return 'bg-danger';
      case 'diverted':
        return 'bg-info';
      case 'landed':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }

  private getCurrentWeek(): number {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.ceil(diff / oneWeek);
  }

  searchByRoute(): void {
    if (!this.fromAirport || !this.toAirport) {
      this.errorMessage = 'Please enter both origin and destination airports';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.flightDetailsService.getFlightsByRoute(this.fromAirport.toUpperCase(), this.toAirport.toUpperCase())
      .subscribe({
        next: (data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            this.flights = data;
            this.filteredFlights = data;
            this.currentPage = 1;
          } else {
            this.flights = [];
            this.filteredFlights = [];
            this.errorMessage = `No flights found from ${this.fromAirport.toUpperCase()} to ${this.toAirport.toUpperCase()}`;
          }
          this.isLoading = false;
        },
        error: (error: Error) => {
          console.error('Error searching flights:', error);
          this.errorMessage = 'Failed to search flights. ' + (error.message || '');
          this.isLoading = false;
        }
      });
  }

  trackFlight(flight: any): void {
    if (flight.flight?.number) {
      const airlineCode = flight.airline?.iataCode || '';
      const flightNumber = flight.flight.number;
      
      const completeFlightNumber = `${airlineCode}${flightNumber}`.toLowerCase();
      
      console.log('Tracking flight:', completeFlightNumber);
      
      this.router.navigate(['/tracker'], {
        queryParams: { flight: completeFlightNumber }
      });
    }
  }
}
