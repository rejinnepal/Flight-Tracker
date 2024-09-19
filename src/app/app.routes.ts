import { Routes} from '@angular/router';
import { AirlineDetailsComponent } from './airline-details/airline-details.component';
import { TrackerComponent } from './tracker/tracker.component';
import { HomeComponent } from './home/home.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { DocsComponent } from './docs/docs.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';

export const routes: Routes = [
  { component: AirlineDetailsComponent, path: 'airlines' },
  { component: TrackerComponent, path: 'tracker' },
  { component: HomeComponent, path: 'home' },
  { component: AirportDetailsComponent, path: 'airports' },
  { component: DocsComponent, path: 'docs' },
  { component: FlightDetailsComponent, path: 'live-flights' },
  { path: '**', redirectTo: '/home' },
];
