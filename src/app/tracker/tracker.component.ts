import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [GoogleMapsModule, FormsModule, CommonModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent implements OnInit {
  @Input() latitude: number = 40.7128;
  @Input() longitude: number = -74.0060;
  flightNumber: string = "";

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  constructor() { }

  ngOnInit(): void {
    this.center = {
      lat: this.latitude,
      lng: this.longitude
    };

    this.markerPosition = {
      lat: this.latitude,
      lng: this.longitude
    };
    // Specify the custom icon for the marker
    this.markerOptions = {
      draggable: false,
      icon: {
        url: 'https://www.svgrepo.com/show/79059/airplane-flight.svg',
        scaledSize: new google.maps.Size(32, 32),  // Adjust size as needed
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16)  // Adjust anchor point as needed
      }
    };
  }

  updatePosition(lat: number, lng: number): void {
    this.markerPosition = { lat, lng };
    this.center = { lat, lng };
    console.log(this.flightNumber);
  }
}
