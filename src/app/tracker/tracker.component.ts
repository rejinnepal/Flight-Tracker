import { Component, Input, OnInit, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightsService } from '../../backend/flights.service';
import { GoogleMapsModule, MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from '../../backend/routes.service';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [FormsModule, CommonModule, GoogleMapsModule],
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  flights: any[] = [];
  errorMessage: string = "";
  displayFilterSearchBar = false;
  displayMapWithPlanes:boolean = false;
  markers: any[] = [];
  selectedFlightNumber: string = "";
  polylines: any[] = [];
  selectedFlightInfo: any = null;
  searchedFlightNumber: string = "";
  isLoadingFinished: boolean = false;
  isLoading: boolean = false;
  routeDetails: any = null;
  isLoadingRoute: boolean = false;

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 3;

  mapOptions: google.maps.MapOptions = {
    styles: [
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#193341"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2c5a71"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#29768a"
          },
          {
            "lightness": -37
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#406d80"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#406d80"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#3e606f"
          },
          {
            "weight": 2
          },
          {
            "gamma": 0.84
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      }
    ],
    streetViewControl: false,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_RIGHT,
      mapTypeIds: ['roadmap', 'satellite', 'terrain', 'hybrid']
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    gestureHandling: 'greedy',  // Allows one-finger zoom on mobile
    minZoom: 2,  // Prevent zooming out too far
    maxZoom: 12, // Prevent zooming in too far
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -180,
        east: 180
      },
      strictBounds: true
    }
  };

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  // Add airport coordinates cache
  private airportCoordinates: { [key: string]: { lat: number, lng: number } } = {
    'JFK': { lat: 40.6413, lng: -73.7781 },
    'LAX': { lat: 33.9416, lng: -118.4085 },
    'LHR': { lat: 51.4700, lng: -0.4543 },
    'DXB': { lat: 25.2532, lng: 55.3657 },
    'CDG': { lat: 49.0097, lng: 2.5479 },
    'SIN': { lat: 1.3644, lng: 103.9915 },
    'HKG': { lat: 22.3080, lng: 113.9185 },
    'AMS': { lat: 52.3086, lng: 4.7639 },
    'FRA': { lat: 50.0379, lng: 8.5622 },
    'ICN': { lat: 37.4602, lng: 126.4407 }
    // Add more airports as needed
  };

  constructor(
    private flightsService: FlightsService,
    private routesService: RoutesService,
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadLiveFlights();
    
    // Check for flight parameter in URL
    this.route.queryParams.subscribe(params => {
      if (params['flight']) {
        // Wait for flights to load then search for the specified flight
        setTimeout(() => {
          this.searchedFlightNumber = params['flight'];
          this.searchFlightNumber();
        }, 1000); // Give time for flights to load
      }
    });
  }

  loadLiveFlights(): void {
    this.isLoadingFinished = false;
    this.flightsService.getFlights().subscribe(
      (data: any[]) => {
        this.flights = data;
        this.displayMapWithPlanes = true;
  
        if (this.flights.length > 0) {
          this.center = { lat: this.flights[0].geography.latitude, lng: this.flights[0].geography.longitude };
  
          this.markers = this.flights.map(flight => {
            const rotation = flight.geography.direction || Math.floor(Math.random() * 360);
            return {
              position: { lat: flight.geography.latitude, lng: flight.geography.longitude },
              title: flight.flight.iataNumber || flight.flight.number,
              icon: {
                path: 'M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684',
                scale: 0.05,
                fillColor: flight.flight?.iataNumber?.toLowerCase() === this.searchedFlightNumber.toLowerCase() ? 
                  '#FF4081' : '#1e88e5',  // Pink for searched flight, blue for others
                fillOpacity: 1,
                strokeColor: flight.flight?.iataNumber?.toLowerCase() === this.searchedFlightNumber.toLowerCase() ? 
                  '#FF4081' : '#1e88e5',
                strokeWeight: 1,
                rotation: rotation - 45, // Adjust rotation to match the plane icon
                anchor: new google.maps.Point(200, 200)
              },
              flightData: flight
            };
          });
        }
        this.isLoadingFinished = true;
      },
      error => {
        this.errorMessage = 'Failed to load live flight data.';
        console.error('Error loading flight data:', error);
        this.isLoadingFinished = true;
      }
    );
  }
  
  
  

  onMarkerClick(marker: any): void {
    if (!marker || !marker.flightData) {
      console.error('Invalid marker or missing flight data');
      return;
    }

    this.selectedFlightInfo = marker.flightData;
    this.loadFlightRoute(marker.flightData);

    // Get departure and arrival coordinates
    const depCode = marker.flightData.departure?.iataCode;
    const arrCode = marker.flightData.arrival?.iataCode;

    const departureCoords = this.airportCoordinates[depCode];
    const arrivalCoords = this.airportCoordinates[arrCode];
    const currentPosition = marker.position;

    console.log('Creating flight path with coordinates:', {
      departure: departureCoords,
      current: currentPosition,
      arrival: arrivalCoords
    });

    if (departureCoords && arrivalCoords && currentPosition) {
      // Create the flight path
      const flightPath = [
        { lat: departureCoords.lat, lng: departureCoords.lng },
        { lat: currentPosition.lat, lng: currentPosition.lng },
        { lat: arrivalCoords.lat, lng: arrivalCoords.lng }
      ];

      // Update the polylines array
      this.polylines = [{
        path: flightPath,
        options: {
          strokeColor: '#FF4081',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          geodesic: true,
          icons: [{
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 3,
              fillColor: '#FF4081',
              fillOpacity: 1,
              strokeWeight: 1
            },
            offset: '50%',
            repeat: '100px'
          }]
        }
      }];

      console.log('Created polylines:', this.polylines);
    } else {
      console.log('Missing coordinates for flight path:', {
        depCode,
        arrCode,
        departureCoords,
        arrivalCoords,
        currentPosition
      });
      this.polylines = [];
    }

    // Create a MapAnchorPoint object that implements the required interface
    const anchorPoint = {
      lat: marker.position.lat,
      lng: marker.position.lng,
      getAnchor: () => new google.maps.MVCObject(),
      getPosition: () => new google.maps.LatLng(marker.position.lat, marker.position.lng)
    };

    // Set the info window options and open it
    if (this.infoWindow) {
      this.infoWindow.options = {
        pixelOffset: new google.maps.Size(0, -30),
        maxWidth: 300
      };
      this.infoWindow.position = new google.maps.LatLng(marker.position.lat, marker.position.lng);
      this.infoWindow.open(anchorPoint);
    }

    // Smoothly pan to the marker
    if (this.map?.googleMap) {
      this.map.googleMap.panTo(marker.position);
    }
  }

  // Add method to clear polylines when clicking on map
  onMapClick(): void {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
    this.polylines = [];  // Clear polylines
    this.selectedFlightInfo = null;
  }

  // Add method to handle marker hover
  onMarkerHover(marker: any): void {
    if (marker?.icon) {
      const hoveredIcon = { ...marker.icon };
      hoveredIcon.scale = 0.07; // Slightly larger
      hoveredIcon.fillOpacity = 0.8;
      marker.setIcon(hoveredIcon);
    }
  }

  // Add method to handle marker mouse out
  onMarkerMouseOut(marker: any): void {
    if (marker?.icon) {
      const normalIcon = { ...marker.icon };
      normalIcon.scale = 0.05; // Back to normal size
      normalIcon.fillOpacity = 1;
      marker.setIcon(normalIcon);
    }
  }

  openInfoWindow(marker: any, flightData: any): void {
    this.selectedFlightInfo = {
      flightNumber: flightData.flight.iataNumber,
      departureAirport: flightData.departure.iataCode,
      arrivalAirport: flightData.arrival.iataCode
    };

    if (this.infoWindow) {
      this.infoWindow.open(marker)
    }
  }

  closeInfoWindow(): void {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }

  searchFlightNumber(): void {
    if (!this.searchedFlightNumber) {
      this.errorMessage = 'Please enter a flight number';
      return;
    }

    const searchValue = this.searchedFlightNumber.toLowerCase();
  
    // First try to find in current flights
    let flight = this.flights.find(f => {
      const iataNumber = f.flight?.iataNumber?.toLowerCase() || '';
      const flightNumber = f.flight?.number?.toLowerCase() || '';
      return iataNumber === searchValue || flightNumber === searchValue;
    });

    if (!flight) {
      // If not found in current flights, search specifically for this flight
      this.isLoading = true;
      this.flightsService.searchSpecificFlight(searchValue).subscribe({
        next: (data) => {
          if (Array.isArray(data) && data.length > 0) {
            flight = data[0];
            this.flights = [...this.flights, ...data];  // Add new flights to existing ones
            this.updateMapForFlight(flight);
          } else {
            this.errorMessage = `Flight ${this.searchedFlightNumber} not found. Please enter the complete flight number (e.g., AA1960)`;
            setTimeout(() => this.errorMessage = '', 5000);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error searching flight:', error);
          this.errorMessage = 'Failed to search for flight. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.updateMapForFlight(flight);
    }
  }

  // Helper method to update map for a found flight
  private updateMapForFlight(flight: any): void {
    this.center = { 
      lat: flight.geography.latitude, 
      lng: flight.geography.longitude 
    };

    this.zoom = 6;

    this.markers = this.flights.map(f => ({
      position: { lat: f.geography.latitude, lng: f.geography.longitude },
      title: f.flight.iataNumber || f.flight.number,
      icon: {
        path: 'M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684',
        scale: 0.05,
        fillColor: (f.flight.iataNumber?.toLowerCase() === this.searchedFlightNumber.toLowerCase() || 
                   f.flight.number?.toLowerCase() === this.searchedFlightNumber.toLowerCase()) ? 
          '#FF4081' : '#1e88e5',  // Pink for searched flight, blue for others
        fillOpacity: 1,
        strokeColor: (f.flight.iataNumber?.toLowerCase() === this.searchedFlightNumber.toLowerCase() || 
                     f.flight.number?.toLowerCase() === this.searchedFlightNumber.toLowerCase()) ? 
          '#FF4081' : '#1e88e5',
        strokeWeight: 1,
        rotation: f.geography.direction - 45 || 0, // Adjust rotation to match the plane icon
        anchor: new google.maps.Point(200, 200)
      },
      flightData: f
    }));

    const markerForFlight = this.markers.find(m =>
      m.flightData.flight.iataNumber?.toLowerCase() === this.searchedFlightNumber.toLowerCase() ||
      m.flightData.flight.number?.toLowerCase() === this.searchedFlightNumber.toLowerCase()
    );

    if (markerForFlight) {
      setTimeout(() => {
        this.onMarkerClick(markerForFlight);
      }, 500);
    }

    this.errorMessage = '';
  }

  loadFlightRoute(flightData: any): void {
    this.isLoadingRoute = true;
    this.routeDetails = null;

    this.routesService.getFlightRoute(flightData).subscribe({
      next: (routeData) => {
        if (Array.isArray(routeData) && routeData.length > 0) {
          this.routeDetails = routeData[0];
          // Update the info window to show the new data
          if (this.infoWindow) {
            this.infoWindow.options = {
              pixelOffset: new google.maps.Size(0, -30),
              maxWidth: 400 // Increased to accommodate more information
            };
          }
        }
        this.isLoadingRoute = false;
      },
      error: (error) => {
        console.error('Error loading route:', error);
        this.isLoadingRoute = false;
      }
    });
  }
}

