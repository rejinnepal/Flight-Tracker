import { Component } from '@angular/core';
import { AirportService } from '../../backend/airport.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-airport-details',
  standalone: true,
  imports: [FormsModule, CommonModule, GoogleMapsModule],
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent {
  icaoCode: string = "";
  airportData: any = null;
  errorMessage: string = "";
  showFavoriteAirport: boolean = true;

  favoriteAirport: any = {
    "ident": "VNKT",
    "iata_code": "KTM",
    "name": "Tribhuvan International Airport",
    "latitude_deg": 27.6966,
    "longitude_deg": 85.3591,
    "country": { "name": "Nepal" },
    "runways": [{ "length_ft": "10007" }],
    "home_link": "http://www.tiairport.com.np/index.php",
    "wikipedia_link": "https://en.wikipedia.org/wiki/Tribhuvan_International_Airport"
  };

  center: google.maps.LatLngLiteral = {
    lat: this.favoriteAirport.latitude_deg,
    lng: this.favoriteAirport.longitude_deg
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral = {
    lat: this.favoriteAirport.latitude_deg,
    lng: this.favoriteAirport.longitude_deg
  };

  constructor(private airportService: AirportService) { }

  searchAirport(): void {
    if (this.icaoCode){
      const code = this.icaoCode.toUpperCase();
      this.airportService.getAirportByCode(code).subscribe(
        (data: any) => {
          this.airportData = data;
          this.errorMessage = "";
          if (this.airportData && this.airportData.latitude_deg && this.airportData.longitude_deg) {
            this.markerPosition = { lat: this.airportData.latitude_deg, lng: this.airportData.longitude_deg };
            this.center = { lat: this.airportData.latitude_deg, lng: this.airportData.longitude_deg };
          }
        this.showFavoriteAirport = false;
        },
        (error: any) => {
          this.airportData = null;
          this.errorMessage = error.message;
        }
      );
    } else {
      this.airportData = null;
      this.errorMessage = "Please enter a valid ICAO code.";
    }
    console.log(this.icaoCode);
  }
}
