import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'tracker',
    loadComponent: () => import('./tracker/tracker.component').then(m => m.TrackerComponent)
  },
  {
    path: 'airports',
    loadComponent: () => import('./airport-details/airport-details.component').then(m => m.AirportDetailsComponent)
  },
  {
    path: 'airlines',
    loadComponent: () => import('./airline-details/airline-details.component').then(m => m.AirlineDetailsComponent)
  },
  {
    path: 'flights',
    loadComponent: () => import('./flight-details/flight-details.component').then(m => m.FlightDetailsComponent)
  },
  {
    path: 'docs',
    loadComponent: () => import('./docs/docs.component').then(m => m.DocsComponent)
  },
  { path: '**', redirectTo: '' }
];
