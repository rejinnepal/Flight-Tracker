// import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { FlightService } from '../../backend/flight.service';
// import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';

// @Component({
//   selector: 'app-tracker',
//   standalone: true,
//   imports: [FormsModule, CommonModule, GoogleMapsModule],
//   templateUrl: './tracker.component.html',
//   styleUrls: ['./tracker.component.css']
// })
// export class TrackerComponent implements OnInit {
//   @Input() latitude: number = 40.7128;
//   @Input() longitude: number = -74.0060; 
//   flightNumber: string = "";
//   flights: any[] = [];
//   errorMessage: string = "";
//   displayFilterSearchBar = false;
//   displayMapWithPlanes:boolean = false;
//   markers: any[] = [];
//   selectedFlightNumber: string = ""; // To hold the flight number for the popup

//   center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
//   zoom = 3; // Adjust zoom level as per your need

//   planeIcon:string = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQMHAgQIBgX/xAA8EAABAwIDBQYEBAUDBQAAAAABAAIDBBEFEiEGEyIxcQdBUWGBkSMyM6EUQlJiCBVyksGCsdE0Q1PC8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC6t/fTKdUtyW8V+SPw9tc32RvrjLbnoge+zcNuaW6LOK/JPc5Re97Jb3Pw2tfvQG93gyWtdAj3Zz35J7rJxXvZLeZ+G1r96Bl+94LWukGbrjJunu91x3vZGffcFrIAu3oy8kg3c8V7p5Nzxc0Zt9w8kATv+EaW1Rbca87otuRm53R9fysgRO/8rIB3PndFtz53THxvKyAI3+vKyL7jh531QTudOd0W3wzckCLd9xXt3Jh+64eaRdueHmjJvuK9u5AFm94gbI3H7vsnn3PBa6PxH7fugW/J0y/dPcgC9+WtkGBo1udEt8TpbyQG+zcNhqnugy7r3tqmYQ3ivy1WG9L+GwF0D3u84bAXTMW7478kbsR8Q1I7l5raTtA2b2efuMUxBgnOhhhvI9vUDl6oPSbze8FrXRkEIz3uvPYBtps1jtjhWLwSTWvuJDkk/tdYn0XoQ/e8JFkDz77g5d6WXc8XO6ZaIhmGqQdvuE6BAA77hOltdEz8DlrdBbuRmGvck07/AEOlkBff+VkX3HndM/A5a3SHxvm0sgdt/rysi+54RrfxWvXVtLhVO6orKiKCBou6WV4a1vqVVu1vbbhdI50Oz1M7EJhoZpCWRDp3u+yC2su+4uVvBGYxcIF+9cwVva/tpUvvHiUdKz9FPTst7uBP3WqztT21Y8O/nsjvJ8ETh92oOqMm+GcnL5J/hx+r7Khtmu3XEYJo4toaCGphJs6emGR7R45eR+yuil2hw6qpoamCsp3RTMa9hzWuCLhBv75ztLDVZmEN1BOmqZhYNRe481HvXE5SBrogBK52mmqzMTWcQJuEGJrRcXuFgJS42I5oKU7ZNoduaGomhYDR4I82jqKK93jwe/m0+WnqqUe9xcXEkuOpJNySu1amlgmp5I5o2yxvbZzJAHNcPAhU3tz2Mx1BkrdkssUpu51A91muP7HHl0OnRBRgcQQRoRyIXrNne0farAC1tLick8Lf+xVfFZ011HoQvNV9DVYdWS0ddTyU9TEcr4pG2c0rXsUF9YD27UU7WQ7RYZJTuJAM1Gc7B5lpNwOl1ZGBbUYDjbM+DYrTVL7XMQeA8dWnULkfDMOrcUrGUmHUstTUP5RxNzFW5sV2J1k0kVZtJWOog2zhTUrwZfV/JvpfqgvUEy8LxbokRuQC25v4r5VVV4TshhEZrK4U1LE3KH1UznuPqSXOPuqq2t7cm8VNsxSB/d+LqgQP9LP+fZBb+JYnQ4fSPqsVq4KSnZzkmeGj7qqdqe3CkpRJT7K0jqmS9vxVU3LH1a0G59bKlsZxvE8cqfxOL109VL3GR1w3oOQ9F89B9faLaXGdo6nf4zXzVJBu1jjZjP6W8gvkkkpIQCEWW1huH1mKVkdJh1LLU1DzwxxNzH/7zQa8bHSPayNrnPcQGtaLknwAXQ+E9kpGFUYq6yWOoEDN6xrzZrsouB6rX7MOy04FURYztE1jsQZxQUoIc2A/qce93TQeatffu8vZACZ/l7KUxNGo5r5WOY9gez8LZcYxGClDjwtkfxO6N5lSYXjVDi8YlwuvpqyImxMEgdbrbkg3WyucQ08iszE1gLm8wmY2tFxzCibI5xAcRY91kDbI55DXcis3xhjS5vMIdG1jS4cwsGvc92U8ig+BtTslg+19OKfGKUOkaCIqlnDJF0Ph5HRV3hXYRT09fJLi+LOqKJrvhwwx5HSD9zr6dB7qzdpNpsD2Yg32LYhDTvsSyLNeR/RvM81TW1nbfiFc11Ns3TfgoSP+onaHSnoNWt+6C1xLsrsHhQY80eFUobo0fUkI93PPuqx2s7b5XGWn2Uotw06CtqRd3VrOQ9b9FUOIV1XiNU+qr6maoneeKSV5cT7rWQbuK4tiGM1jqzFKuWqqHaGSV1zbwHgPILSQhAIQm3nyQJb2FYRiGM1YpMLo5qqc/kibe3U8h6q39kOxKJ0EFbtTVOJkaHijpjawIvZ7yL38QPdXDguDYbhNI2mw2igpYW/lhZlv5nxPmUFN7H9hskojqtqazds5mjpjdx/qf3dB7q3cHwPC9m6UUmC0UVLEBrkF3O83OOp9V9OR27NmpsaJG5n8/JA2MEgzO5+Se4Z5+6je4xuysOix30nj9kHPPbPsXV4VikmPQvmqqCqf8R0jy91O8/lJP5SeXhyVa0tXUUM4moqiWnlHKSF5Y4eoXaNbQ0tbRzUtXAyaCVhZJG8XDmnmCuYe03YGfZGvM9K18uETv+DKdd2f/G7zHce9BPgPbDtZhWWOpqY8ShH5att3W/rFj73Vj4D23bPVYDcWpKjDZf1Ab6P3Av8AZc7kHvCLoOsMQ7RtlqGgbWTY1TzRP+VlOc73+QaNfeyqXa3tqxTEC+n2cgGG050E7jnmcP8AZvpc+aqlCCaqqqisndPVzyzzP+aSV5c49SVChCAQhfc2Z2Sxzaefd4Ph8kzb2dMeGNnVx0/yg+GhbWKUT8OxKqoZXtfJTTOhe5nIlpsbeoWqgF6js0wU47trhlK5uaFkonn/AKGan3Nh6ry6vf8AhzwHLR4ljs7NZnCmguPyt1cfUkD/AEoLkjAkBzC47kpCYzZmgRL8MgN0v4JxASC79SEBGBI279SsXkxusw2CcpMbrM0Hgso2iRuZ4BKAjaJG3eLlZbln6VFK5zHWYbDwWG9k/UfZA2yPLgC42WOJ4bR4nh89FXU7JqaZhbJG4aEf8+a2ixoBIaL9FrNc7NqTqg5i7SOz6s2SqnVFOHz4RI74c9rmLwa/z8D3rwxFl2zXUVLW0ctNV08c0ErcskcjQ5rh5gqqK3sOwCpqnPpMQrqSNxuIuGQN8gSL263Qc+oAuuiKbsI2ch46jEMSqLc25mMB9m3+69FhHZlsdh725MFgnI76omX7O0+yDl+hw2uxGTd4fR1NVJ+iCFzz7AL3WCdje1eIhslZDDhsJOpqX3fbya2/3suk4qOloabd0VNDTxtFg2GMMA9AnES59nEkeaCuNl+xvZzDXslxPe4pOBe0/DED/QOfqSrHZBBQ07GU0UcEMdgGRtDWtHkApJgGsu3Qr52L1H4fB8QncdIqaR+vk0oOPcQqXVlfU1TvmnmfIeriT/layEIG1peQGgkk2AAuSV1/slgw2b2Yw3C4wGuhhG8t3vOrj7krnLsjwX+d7cUDXx5qelJqZr8rN+X3dlC6og4wc2vVARfEBL9bJS8DgGaC3JE/ARl0B8FlDxtu7U+aBRAPbdwBN1jKSx9m6CyJiWus3QLOEBzLu1KAjaHsDni5We7Z+kKCUlr7NJA8isM7v1H3QDXEuAzH3Wy5rcvIdVk4Cx0C1gTcXJ5oBrnF1iTZTvADDYBNwGUkAclrMvnA1sgyjJLwDeymkADLgBEgAYbc1DGTnF+SAiJLgHHRSzANbcaFOYARmyhh1eLoCHidYkkea892oTto+z/HJQcpNK5gI8XEN/yvTTWDNPHuVedt9RuuzquYT9aaFg/vDv8A1QcyoQpaWGSpqIoIGl0srwxjR3uJsAgvz+HbAhS4HXYzM0F9bIIoj+xl7+7if7VbM/Dly6L5uA4RHgWz+HYXD8tLA2MkfmNtT6m59V9ODW+bXqgIeIHNr1WM92u4dOidRoWgadE4NW8WvVA4QHNu7U+awmu1+hIHkic2fw/ZSQWLNdde9ARAObci581nlHgPZa8/z6KO58T7oG2+Yc+a2nZcp5ck3EZTqPdarb5gTyugGZsw52utl4GR1h3dyHEZTqFrMFngkaX5oHEDnF7281PJbIbWvZElshtb0UEdw8XvbzQOK+dt72Us3yac7omtuzZRQ3D+WiBw/PxfdVf/ABF1O62SoYGkfGrRfo1rj/vZWnMRk4VRv8R87h/IaW+nx5CD/oA/ygpVe97FcD/nG29PNJHmgw9pqX3FxmBswf3EH0Xgl0f2A7PuwrZmbEqqLJPiTw9mYWO6A4fe5PqEFlwczm5eaJ+7L62Tn7svPyRB35ufmgIORv8AdYzjjbbw7k6jmLD2Tg0ab+PegcFsnF91HNfPw8vJOf5+G/opIfk4vugIfkFxqpLBa0441HY+BQNrTmGh5+C2nOFiLi9kFzbHiHutcNOYGx580CaCHC4K2XkFpAIvZDnNykXC142uDgSCPNARNIcLhTSkFpAOqHuaWEA6qJgIeC4aICEEPFxZSzEFmhv0RKQ6MhpBKiiBa65Fh0QEIIfxCw81WfarsFi+2m0mHPo5aeChgpyx80jrlpLrmzRqe7wVoTEObZupWMXC67tNEHhdkOyrZzZ5zZ54P5hWDXfVQBDT+1vIfcr3UwGVoYBYeCc/EOHVKHgJzaeF0Dp+G+bTqlPxWy69ETnOAG6+Nk4eC+bTwQEGgN9Ep+JwLdUT8RGTW3gnCcos7TqgcHCzi0WEwJfca6dyJQXOu3ULOE5WcRAN+9A4SAzU26qTM39Q91rTDM+7RcdFhkd+g+yBDmOq3HfKUIQasfzt6rZk+m7ohCDWi+oFsTfSKEIIYPqhS1H0j1QhBHT/AFPRZ1P0/VNCCOm+Y9FlU8ghCApu9Kp5t6IQgypuTuqwqfnHRCEGdP8AJ6qOo+p6IQgmg+mFIhCD/9k="
//   markerOptions: google.maps.MarkerOptions = { draggable: false };

//   @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow | undefined; // Reference to the info window

//   constructor(private flightService: FlightService, 
//   ) {}

//   ngOnInit(): void {
//     // this.getLiveFlights();
//   }

//   updatePosition(lat: number, lng: number): void {
//     this.center = { lat, lng };
//   }

//   loadFlights(): void {
//     this.flightService.getFlights().subscribe(
//       (data: any[]) => {
//         this.flights = data;
//         console.log('Flight data:', data);
//         this.displayFilterSearchBar = true;
//       },
//       error => {
//         this.errorMessage = 'Failed to load flight data.';
//         console.error('Error loading flight data:', error);
//       }
//     );
//   }

//   // loadFlights(): void {
//   //   this.flightService.getFlights().subscribe(
//   //     (allData: any[]) => {
//   //       this.flights = allData;
//   //       console.log('Flight data:', allData.data);
//   //       this.displayFilterSearchBar = true;
//   //     },
//   //     error => {
//   //       this.errorMessage = 'Failed to load flight data.';
//   //       console.error('Error loading flight data:', error);
//   //     }
//   //   );
//   // }

//   getLiveFlights() {
//     const flights = [
//       { flightNumber: 'AA123', latitude: 40.7128, longitude: -74.0060 },
//       { flightNumber: 'UA456', latitude: 34.0522, longitude: -118.2437 },
//       { flightNumber: 'DL789', latitude: 51.5074, longitude: -0.1278 }
//     ];
//     this.displayMapWithPlanes = true;
//     console.log(this.displayMapWithPlanes)
//     console.log(flights);
//     // Center the map on the first flight
//     this.center = { lat: flights[0].latitude, lng: flights[0].longitude };

//     // Map flights to markers
//     this.markers = flights.map(flight => ({
//       position: { lat: flight.latitude, lng: flight.longitude },
//       title: flight.flightNumber,
//       icon: {
//         url: this.planeIcon,
//         scaledSize: new google.maps.Size(50,50)
//       }
//     }));

//     console.log('Markers:', this.markers);
//   }

//   openInfoWindow(marker: any, flightNumber: string) {
//     this.selectedFlightNumber = flightNumber;
//     if (this.infoWindow) {
//       this.infoWindow.open(marker);
//     }
//   }
// }



import { Component, Input, OnInit, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightsService } from '../../backend/flights.service';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
// import { Subscription, interval } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


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
  selectedFlightNumber: string = ""; // To hold the flight number for the popup
  polylines: any[] = []; // To store polylines for flight paths
  selectedFlightInfo: any = null; // Store the selected flight's info for the popup

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 3; // Adjust zoom level as per your need
  // private updateSubscription: Subscription | undefined; // Subscription to manage the interval


  // planeIcon:string = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQMHAgQIBgX/xAA8EAABAwIDBQYEBAUDBQAAAAABAAIDBBEFEiEGEyIxcQdBUWGBkSMyM6EUQlJiCBVyksGCsdE0Q1PC8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC6t/fTKdUtyW8V+SPw9tc32RvrjLbnoge+zcNuaW6LOK/JPc5Re97Jb3Pw2tfvQG93gyWtdAj3Zz35J7rJxXvZLeZ+G1r96Bl+94LWukGbrjJunu91x3vZGffcFrIAu3oy8kg3c8V7p5Nzxc0Zt9w8kATv+EaW1Rbca87otuRm53R9fysgRO/8rIB3PndFtz53THxvKyAI3+vKyL7jh531QTudOd0W3wzckCLd9xXt3Jh+64eaRdueHmjJvuK9u5AFm94gbI3H7vsnn3PBa6PxH7fugW/J0y/dPcgC9+WtkGBo1udEt8TpbyQG+zcNhqnugy7r3tqmYQ3ivy1WG9L+GwF0D3u84bAXTMW7478kbsR8Q1I7l5raTtA2b2efuMUxBgnOhhhvI9vUDl6oPSbze8FrXRkEIz3uvPYBtps1jtjhWLwSTWvuJDkk/tdYn0XoQ/e8JFkDz77g5d6WXc8XO6ZaIhmGqQdvuE6BAA77hOltdEz8DlrdBbuRmGvck07/AEOlkBff+VkX3HndM/A5a3SHxvm0sgdt/rysi+54RrfxWvXVtLhVO6orKiKCBou6WV4a1vqVVu1vbbhdI50Oz1M7EJhoZpCWRDp3u+yC2su+4uVvBGYxcIF+9cwVva/tpUvvHiUdKz9FPTst7uBP3WqztT21Y8O/nsjvJ8ETh92oOqMm+GcnL5J/hx+r7Khtmu3XEYJo4toaCGphJs6emGR7R45eR+yuil2hw6qpoamCsp3RTMa9hzWuCLhBv75ztLDVZmEN1BOmqZhYNRe481HvXE5SBrogBK52mmqzMTWcQJuEGJrRcXuFgJS42I5oKU7ZNoduaGomhYDR4I82jqKK93jwe/m0+WnqqUe9xcXEkuOpJNySu1amlgmp5I5o2yxvbZzJAHNcPAhU3tz2Mx1BkrdkssUpu51A91muP7HHl0OnRBRgcQQRoRyIXrNne0farAC1tLick8Lf+xVfFZ011HoQvNV9DVYdWS0ddTyU9TEcr4pG2c0rXsUF9YD27UU7WQ7RYZJTuJAM1Gc7B5lpNwOl1ZGBbUYDjbM+DYrTVL7XMQeA8dWnULkfDMOrcUrGUmHUstTUP5RxNzFW5sV2J1k0kVZtJWOog2zhTUrwZfV/JvpfqgvUEy8LxbokRuQC25v4r5VVV4TshhEZrK4U1LE3KH1UznuPqSXOPuqq2t7cm8VNsxSB/d+LqgQP9LP+fZBb+JYnQ4fSPqsVq4KSnZzkmeGj7qqdqe3CkpRJT7K0jqmS9vxVU3LH1a0G59bKlsZxvE8cqfxOL109VL3GR1w3oOQ9F89B9faLaXGdo6nf4zXzVJBu1jjZjP6W8gvkkkpIQCEWW1huH1mKVkdJh1LLU1DzwxxNzH/7zQa8bHSPayNrnPcQGtaLknwAXQ+E9kpGFUYq6yWOoEDN6xrzZrsouB6rX7MOy04FURYztE1jsQZxQUoIc2A/qce93TQeatffu8vZACZ/l7KUxNGo5r5WOY9gez8LZcYxGClDjwtkfxO6N5lSYXjVDi8YlwuvpqyImxMEgdbrbkg3WyucQ08iszE1gLm8wmY2tFxzCibI5xAcRY91kDbI55DXcis3xhjS5vMIdG1jS4cwsGvc92U8ig+BtTslg+19OKfGKUOkaCIqlnDJF0Ph5HRV3hXYRT09fJLi+LOqKJrvhwwx5HSD9zr6dB7qzdpNpsD2Yg32LYhDTvsSyLNeR/RvM81TW1nbfiFc11Ns3TfgoSP+onaHSnoNWt+6C1xLsrsHhQY80eFUobo0fUkI93PPuqx2s7b5XGWn2Uotw06CtqRd3VrOQ9b9FUOIV1XiNU+qr6maoneeKSV5cT7rWQbuK4tiGM1jqzFKuWqqHaGSV1zbwHgPILSQhAIQm3nyQJb2FYRiGM1YpMLo5qqc/kibe3U8h6q39kOxKJ0EFbtTVOJkaHijpjawIvZ7yL38QPdXDguDYbhNI2mw2igpYW/lhZlv5nxPmUFN7H9hskojqtqazds5mjpjdx/qf3dB7q3cHwPC9m6UUmC0UVLEBrkF3O83OOp9V9OR27NmpsaJG5n8/JA2MEgzO5+Se4Z5+6je4xuysOix30nj9kHPPbPsXV4VikmPQvmqqCqf8R0jy91O8/lJP5SeXhyVa0tXUUM4moqiWnlHKSF5Y4eoXaNbQ0tbRzUtXAyaCVhZJG8XDmnmCuYe03YGfZGvM9K18uETv+DKdd2f/G7zHce9BPgPbDtZhWWOpqY8ShH5att3W/rFj73Vj4D23bPVYDcWpKjDZf1Ab6P3Av8AZc7kHvCLoOsMQ7RtlqGgbWTY1TzRP+VlOc73+QaNfeyqXa3tqxTEC+n2cgGG050E7jnmcP8AZvpc+aqlCCaqqqisndPVzyzzP+aSV5c49SVChCAQhfc2Z2Sxzaefd4Ph8kzb2dMeGNnVx0/yg+GhbWKUT8OxKqoZXtfJTTOhe5nIlpsbeoWqgF6js0wU47trhlK5uaFkonn/AKGan3Nh6ry6vf8AhzwHLR4ljs7NZnCmguPyt1cfUkD/AEoLkjAkBzC47kpCYzZmgRL8MgN0v4JxASC79SEBGBI279SsXkxusw2CcpMbrM0Hgso2iRuZ4BKAjaJG3eLlZbln6VFK5zHWYbDwWG9k/UfZA2yPLgC42WOJ4bR4nh89FXU7JqaZhbJG4aEf8+a2ixoBIaL9FrNc7NqTqg5i7SOz6s2SqnVFOHz4RI74c9rmLwa/z8D3rwxFl2zXUVLW0ctNV08c0ErcskcjQ5rh5gqqK3sOwCpqnPpMQrqSNxuIuGQN8gSL263Qc+oAuuiKbsI2ch46jEMSqLc25mMB9m3+69FhHZlsdh725MFgnI76omX7O0+yDl+hw2uxGTd4fR1NVJ+iCFzz7AL3WCdje1eIhslZDDhsJOpqX3fbya2/3suk4qOloabd0VNDTxtFg2GMMA9AnES59nEkeaCuNl+xvZzDXslxPe4pOBe0/DED/QOfqSrHZBBQ07GU0UcEMdgGRtDWtHkApJgGsu3Qr52L1H4fB8QncdIqaR+vk0oOPcQqXVlfU1TvmnmfIeriT/layEIG1peQGgkk2AAuSV1/slgw2b2Yw3C4wGuhhG8t3vOrj7krnLsjwX+d7cUDXx5qelJqZr8rN+X3dlC6og4wc2vVARfEBL9bJS8DgGaC3JE/ARl0B8FlDxtu7U+aBRAPbdwBN1jKSx9m6CyJiWus3QLOEBzLu1KAjaHsDni5We7Z+kKCUlr7NJA8isM7v1H3QDXEuAzH3Wy5rcvIdVk4Cx0C1gTcXJ5oBrnF1iTZTvADDYBNwGUkAclrMvnA1sgyjJLwDeymkADLgBEgAYbc1DGTnF+SAiJLgHHRSzANbcaFOYARmyhh1eLoCHidYkkea892oTto+z/HJQcpNK5gI8XEN/yvTTWDNPHuVedt9RuuzquYT9aaFg/vDv8A1QcyoQpaWGSpqIoIGl0srwxjR3uJsAgvz+HbAhS4HXYzM0F9bIIoj+xl7+7if7VbM/Dly6L5uA4RHgWz+HYXD8tLA2MkfmNtT6m59V9ODW+bXqgIeIHNr1WM92u4dOidRoWgadE4NW8WvVA4QHNu7U+awmu1+hIHkic2fw/ZSQWLNdde9ARAObci581nlHgPZa8/z6KO58T7oG2+Yc+a2nZcp5ck3EZTqPdarb5gTyugGZsw52utl4GR1h3dyHEZTqFrMFngkaX5oHEDnF7281PJbIbWvZElshtb0UEdw8XvbzQOK+dt72Us3yac7omtuzZRQ3D+WiBw/PxfdVf/ABF1O62SoYGkfGrRfo1rj/vZWnMRk4VRv8R87h/IaW+nx5CD/oA/ygpVe97FcD/nG29PNJHmgw9pqX3FxmBswf3EH0Xgl0f2A7PuwrZmbEqqLJPiTw9mYWO6A4fe5PqEFlwczm5eaJ+7L62Tn7svPyRB35ufmgIORv8AdYzjjbbw7k6jmLD2Tg0ab+PegcFsnF91HNfPw8vJOf5+G/opIfk4vugIfkFxqpLBa0441HY+BQNrTmGh5+C2nOFiLi9kFzbHiHutcNOYGx580CaCHC4K2XkFpAIvZDnNykXC142uDgSCPNARNIcLhTSkFpAOqHuaWEA6qJgIeC4aICEEPFxZSzEFmhv0RKQ6MhpBKiiBa65Fh0QEIIfxCw81WfarsFi+2m0mHPo5aeChgpyx80jrlpLrmzRqe7wVoTEObZupWMXC67tNEHhdkOyrZzZ5zZ54P5hWDXfVQBDT+1vIfcr3UwGVoYBYeCc/EOHVKHgJzaeF0Dp+G+bTqlPxWy69ETnOAG6+Nk4eC+bTwQEGgN9Ep+JwLdUT8RGTW3gnCcos7TqgcHCzi0WEwJfca6dyJQXOu3ULOE5WcRAN+9A4SAzU26qTM39Q91rTDM+7RcdFhkd+g+yBDmOq3HfKUIQasfzt6rZk+m7ohCDWi+oFsTfSKEIIYPqhS1H0j1QhBHT/AFPRZ1P0/VNCCOm+Y9FlU8ghCApu9Kp5t6IQgypuTuqwqfnHRCEGdP8AJ6qOo+p6IQgmg+mFIhCD/9k="
  // planeIcon:string = ""
  planeIcon:string = "https://cdn-icons-png.flaticon.com/128/3778/3778489.png"

  markerOptions: google.maps.MarkerOptions = { draggable: false };

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow | undefined; // Reference to the info window

  constructor(private flightsService: FlightsService, @Inject(PLATFORM_ID) private platformId: object // Inject the platform to check if it's browser
  ) {}

  // ngOnInit(): void {
  //   this.loadLiveFlights();
  //   // // Set up interval to refresh the flight data every 30 seconds
  //   // this.updateSubscription = interval(30000).subscribe(() => {
  //   //   this.loadLiveFlights();
  //   // });
  // }

  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     // Load flights once on component initialization
  //     this.loadLiveFlights();
  //   }
  // }

  ngOnInit(): void {
    this.loadLiveFlights();
  }

  // Method to load live flight data from the service
  loadLiveFlights(): void {
    this.flightsService.getFlights().subscribe(
      (data: any[]) => {
        this.flights = data;
        this.displayMapWithPlanes = true;

        // Center the map on the first flight and create markers
        if (data.length > 0) {
          this.center = { lat: data[0].geography.latitude, lng: data[0].geography.longitude };
          this.markers = data.map(flight => ({
            position: { lat: flight.geography.latitude, lng: flight.geography.longitude },
            title: flight.flight.iataNumber || flight.flight.number,
            icon: {
              url: this.planeIcon,
              scaledSize: new google.maps.Size(20, 20)
            }
          }));
        }
      },
      error => {
        this.errorMessage = 'Failed to load live flight data.';
        console.error('Error loading flight data:', error);
      }
    );
  }

  // Handle marker click to draw the flight path
  onMarkerClick(marker: any): void {
    const flight = marker.flightData;

    // Assuming you have departure and arrival lat/lng
    const departureLat = flight.departure.latitude;
    const departureLng = flight.departure.longitude;
    const currentLat = flight.geography.latitude;
    const currentLng = flight.geography.longitude;

    if (departureLat && departureLng && currentLat && currentLng) {
      // Clear existing polylines if any
      this.polylines = [];

      // Draw a polyline from the departure airport to the current flight position
      const flightPath = {
        path: [
          { lat: departureLat, lng: departureLng }, // Departure airport location
          { lat: currentLat, lng: currentLng } // Current flight location
        ],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      };

      this.polylines.push(flightPath); // Add this polyline to the map
    } else {
      console.error('Invalid coordinates for flight path.');
    }
  }

  // Open InfoWindow when the user hovers over a marker
  openInfoWindow(marker: any, flightData: any): void {
    this.selectedFlightInfo = {
      flightNumber: flightData.flight.iataNumber,
      departureAirport: flightData.departure.iataCode,
      arrivalAirport: flightData.arrival.iataCode
    };

    if (this.infoWindow) {
      this.infoWindow.open(marker); // Open the info window at the marker's position
    }
  }

  // Close the InfoWindow when the user stops hovering over a marker
  closeInfoWindow(): void {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }
}

