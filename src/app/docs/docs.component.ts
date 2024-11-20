import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ContentItem {
  title: string;
  description: string;
  steps?: string[];
  features?: string[];
}

interface Section {
  title: string;
  icon: string;
  content: ContentItem[];
}

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent {
  sections: Section[] = [
    {
      title: 'Flight Tracking',
      icon: 'flight',
      content: [
        {
          title: 'Real-time Flight Tracker',
          description: 'Track flights in real-time on our interactive map.',
          steps: [
            'Navigate to the Flight Tracker page',
            'Enter a flight number (e.g., AA123) in the search box',
            'View the flight\'s real-time position on the map',
            'Click on aircraft icons to view flight details'
          ],
          features: [
            'Real-time aircraft positions',
            'Flight path visualization',
            'Multiple map views (Default, Satellite, Terrain)',
            'Interactive map controls',
            'Flight information windows'
          ]
        }
      ]
    },
    {
      title: 'Flight Schedules',
      icon: 'schedule',
      content: [
        {
          title: 'Flight Search',
          description: 'Search and view flight schedules.',
          steps: [
            'Go to the Flights page',
            'Search by route using airport IATA codes (e.g., JFK to LAX)',
            'Browse through available flights',
            'Click "Show in Map" to track specific flights'
          ],
          features: [
            'Search flights by route',
            'View departure and arrival times',
            'See airline and flight numbers',
            'Terminal and gate information',
            'Direct link to flight tracking'
          ]
        }
      ]
    },
    {
      title: 'Airport Information',
      icon: 'local_airport',
      content: [
        {
          title: 'Airport Directory',
          description: 'Access information about airports worldwide.',
          steps: [
            'Navigate to the Airports page',
            'Use the search box to find airports',
            'Search by airport name, IATA, or ICAO code',
            'View detailed airport information'
          ],
          features: [
            'Comprehensive airport database',
            'Search by name or code',
            'Airport location details',
            'Basic airport information'
          ]
        }
      ]
    },
    {
      title: 'Airline Directory',
      icon: 'airlines',
      content: [
        {
          title: 'Airline Information',
          description: 'Browse comprehensive airline database.',
          steps: [
            'Go to the Airlines page',
            'Search by airline name, IATA, or ICAO code',
            'Browse through airline listings',
            'View detailed airline information'
          ],
          features: [
            'Airline fleet information',
            'IATA and ICAO codes',
            'Country of operation',
            'Airline status',
            'Fleet size and age',
            'Founding year',
            'Airline type',
            'Hub information'
          ]
        }
      ]
    }
  ];
}
