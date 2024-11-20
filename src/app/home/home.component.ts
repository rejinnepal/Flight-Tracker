import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features = [
    {
      icon: 'flight',
      title: 'Live Flight Tracking',
      description: 'Track flights in real-time with detailed information about their current status, route, and estimated arrival times.',
      route: '/tracker'
    },
    {
      icon: 'local_airport',
      title: 'Airport Directory',
      description: 'Access comprehensive information about airports worldwide, including facilities, weather, and flight schedules.',
      route: '/airports'
    },
    {
      icon: 'airlines',
      title: 'Airline Information',
      description: 'Explore detailed information about airlines, including fleet sizes, routes, and company profiles.',
      route: '/airlines'
    },
    {
      icon: 'schedule',
      title: 'Flight Schedules',
      description: 'View upcoming flight schedules, delays, and gate information for any airport or airline.',
      route: '/schedules'
    }
  ];
}
