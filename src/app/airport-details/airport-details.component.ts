import { Component } from '@angular/core';
// import { AirportService } from '../../backend/airport.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-airport-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './airport-details.component.html',
  styleUrl: './airport-details.component.css'
})
export class AirportDetailsComponent {
  icaoCode: string = "";
  // airportData: any = null;
  airportData: any = {
    "ident": "VNKT",
    "type": "large_airport",
    "name": "Tribhuvan International Airport",
    "latitude_deg": 27.6966,
    "longitude_deg": 85.3591,
    "elevation_ft": "4390",
    "continent": "AS",
    "iso_country": "NP",
    "iso_region": "NP-BA",
    "municipality": "Kathmandu",
    "scheduled_service": "yes",
    "gps_code": "VNKT",
    "iata_code": "KTM",
    "local_code": "",
    "home_link": "http://www.tiairport.com.np/index.php",
    "wikipedia_link": "https://en.wikipedia.org/wiki/Tribhuvan_International_Airport",
    "keywords": "gaucharan",
    "icao_code": "VNKT",
    "runways": [
      {
        "id": "237990",
        "airport_ref": "26596",
        "airport_ident": "VNKT",
        "length_ft": "10007",
        "width_ft": "148",
        "surface": "ASP",
        "lighted": "1",
        "closed": "0",
        "le_ident": "02",
        "le_latitude_deg": "27.6838",
        "le_longitude_deg": "85.3534",
        "le_elevation_ft": "4313",
        "le_heading_degT": "21.6",
        "le_displaced_threshold_ft": "",
        "he_ident": "20",
        "he_latitude_deg": "27.7094",
        "he_longitude_deg": "85.3648",
        "he_elevation_ft": "4387",
        "he_heading_degT": "201.6",
        "he_displaced_threshold_ft": "400"
      }
    ],
    "freqs": [
      {
        "id": "55877",
        "airport_ref": "26596",
        "airport_ident": "VNKT",
        "type": "APP",
        "description": "KATHMANDU APP",
        "frequency_mhz": "120.6"
      },
      {
        "id": "55878",
        "airport_ref": "26596",
        "airport_ident": "VNKT",
        "type": "ATIS",
        "description": "KATHMANDU ATIS",
        "frequency_mhz": "127"
      },
      {
        "id": "55879",
        "airport_ref": "26596",
        "airport_ident": "VNKT",
        "type": "GND",
        "description": "KATHMANDU GND",
        "frequency_mhz": "121.9"
      },
      {
        "id": "55880",
        "airport_ref": "26596",
        "airport_ident": "VNKT",
        "type": "RDO",
        "description": "KATHMANDU RDO",
        "frequency_mhz": "292.3"
      },
      {
        "id": "55881",
        "airport_ref": "26596",
        "airport_ident": "VNKT",
        "type": "TWR",
        "description": "KATHMANDU TWR",
        "frequency_mhz": "118.1"
      }
    ],
    "country": {
      "id": "302654",
      "code": "NP",
      "name": "Nepal",
      "continent": "AS",
      "wikipedia_link": "https://en.wikipedia.org/wiki/Nepal",
      "keywords": "नेपाल विमानस्थलको"
    },
    "region": {
      "id": "306444",
      "code": "NP-BA",
      "local_code": "BA",
      "name": "Bagmati",
      "continent": "AS",
      "iso_country": "NP",
      "wikipedia_link": "https://en.wikipedia.org/wiki/Bagmati",
      "keywords": ""
    },
    "navaids": [
      {
        "id": "89651",
        "filename": "Kathmandu_NDB_NP",
        "ident": "KAM",
        "name": "Kathmandu",
        "type": "NDB",
        "frequency_khz": "318",
        "latitude_deg": "27.693899154663086",
        "longitude_deg": "85.35359954833984",
        "elevation_ft": "",
        "iso_country": "NP",
        "dme_frequency_khz": "",
        "dme_channel": "",
        "dme_latitude_deg": "",
        "dme_longitude_deg": "",
        "dme_elevation_ft": "",
        "slaved_variation_deg": "",
        "magnetic_variation_deg": "0.071",
        "usageType": "BOTH",
        "power": "LOW",
        "associated_airport": "VNKT"
      },
      {
        "id": "90033",
        "filename": "Kathmandu_VOR-DME_NP",
        "ident": "KTM",
        "name": "Kathmandu",
        "type": "VOR-DME",
        "frequency_khz": "112300",
        "latitude_deg": "27.674699783325195",
        "longitude_deg": "85.34919738769531",
        "elevation_ft": "4255",
        "iso_country": "NP",
        "dme_frequency_khz": "112300",
        "dme_channel": "070X",
        "dme_latitude_deg": "",
        "dme_longitude_deg": "",
        "dme_elevation_ft": "",
        "slaved_variation_deg": "0.007",
        "magnetic_variation_deg": "0.069",
        "usageType": "BOTH",
        "power": "HIGH",
        "associated_airport": "VNKT"
      },
      {
        "id": "90439",
        "filename": "Nalinchowk_NDB_NP",
        "ident": "LNC",
        "name": "Nalinchowk",
        "type": "NDB",
        "frequency_khz": "252",
        "latitude_deg": "27.650299072265625",
        "longitude_deg": "85.46499633789062",
        "elevation_ft": "",
        "iso_country": "NP",
        "dme_frequency_khz": "",
        "dme_channel": "",
        "dme_latitude_deg": "",
        "dme_longitude_deg": "",
        "dme_elevation_ft": "",
        "slaved_variation_deg": "",
        "magnetic_variation_deg": "0.064",
        "usageType": "BOTH",
        "power": "LOW",
        "associated_airport": "VNKT"
      }
    ],
    "station": {
      "icao_code": "VNKT",
      "distance": 0
    }
  };
  errorMessage: string = "";

  // constructor(private airportService: AirportService) { }

  searchAirport(): void {
    // if (this.icaoCode){
    //   this.airportService.getAirportByCode(this.icaoCode).subscribe(
    //     (data: any) => {
    //       this.airportData = data;
    //       this.errorMessage = "";
    //     },
    //     (error: any) => {
    //       this.airportData = null;
    //       this.errorMessage = error.message;
    //     }
    //   );
    // } else {
    //   this.airportData = null;
    //   this.errorMessage = "Please enter a valid ICAO code.";
    // }
    console.log(this.icaoCode);
  }
}
 