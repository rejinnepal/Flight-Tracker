import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../backend/flight.service';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  @Input() latitude: number = 40.7128;
  @Input() longitude: number = -74.0060; 
  flightNumber: string = "";
  flights: any[] = [];
  errorMessage: string = "";
  displayFilterSearchBar = false;
  markerPosition: { lat: number, lng: number } = { lat: 0, lng: 0 };

  constructor(private flightService: FlightService, 
  ) {}

  ngOnInit(): void {
    this.getLiveFlights();
  }

  updatePosition(lat: number, lng: number): void {
    this.markerPosition = { lat, lng };
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe(
      (data: any[]) => {
        this.flights = data;
        console.log('Flight data:', data);
        this.displayFilterSearchBar = true;
      },
      error => {
        this.errorMessage = 'Failed to load flight data.';
        console.error('Error loading flight data:', error);
      }
    );
  }

  getLiveFlights() {
    const flights = [
      { flightNumber: 'AA123', latitude: 40.7128, longitude: -74.0060 },
      { flightNumber: 'UA456', latitude: 34.0522, longitude: -118.2437 },
      { flightNumber: 'DL789', latitude: 51.5074, longitude: -0.1278 }
    ];

    console.log(flights);
  }
}

