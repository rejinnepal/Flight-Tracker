import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../backend/flight.service';
import { flights } from '../../backend/flight';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css'
})
export class FlightDetailsComponent {
  @Input() latitude: number = 40.7128;
  @Input() longitude: number = -74.0060;
  flightNumber: string = "";
  flights:any[] = [];
  filteredFlights: any[] = []; // The filtered list of flights to be displayed
  errorMessage:string = "";
  displayFilterSearchBar = false;

  constructor(private flightService: FlightService) {}

  // loadFlights():void {
  //   this.flightService.getFlights().subscribe(
  //     (data: any[]) => {
  //       this.flights = data;
  //       console.log('flight data: ', data);
  //     },
  //     error => {
  //       this.errorMessage = 'Failed to load flight data.';
  //       console.error('Error loading flight data:', error);
  //     }
  //   );
  //    this.filteredFlights = this.flights;
  //   this.displayFilterSearchBar = true;
  // }

  loadFlights():void {
    this.flights = flights.data;
    this.filteredFlights = this.flights;
    this.displayFilterSearchBar = true;
  }

  filterFlights():void {
    if (!this.flightNumber) {
      this.filteredFlights = this.flights;
      return;
    }
    this.filteredFlights = this.flights.filter(flight => 
      flight.flight.iata && flight.flight.iata.toLowerCase().includes(this.flightNumber.toLowerCase())
    );
  }
}
