import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AirportsService } from '../../backend/airports.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-airport-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {
  airports: any[] = [];
  filteredAirports: any[] = [];
  searchCode: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  Math = Math;

  constructor(
    private airportsService: AirportsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAirports();
  }

  loadAirports(): void {
    this.isLoading = true;
    this.airportsService.getAirports().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.airports = data;
        } else if (data.data && Array.isArray(data.data)) {
          this.airports = data.data;
        } else {
          console.error('Unexpected API response format:', data);
          this.errorMessage = 'Invalid data format received from API';
        }
        this.filteredAirports = this.airports;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading airports data:', error);
        this.errorMessage = 'Failed to load airports data. ' + (error.message || '');
        this.isLoading = false;
      }
    });
  }

  searchAirports(): void {
    if (!this.searchCode) {
      this.filteredAirports = this.airports;
      return;
    }
    
    const searchValue = this.searchCode.toLowerCase();
    this.filteredAirports = this.airports.filter(airport => {
      return (
        airport.codeIataAirport?.toLowerCase().includes(searchValue) ||
        airport.codeIcaoAirport?.toLowerCase().includes(searchValue) ||
        airport.nameAirport?.toLowerCase().includes(searchValue) ||
        airport.nameCountry?.toLowerCase().includes(searchValue)
      );
    });

    this.currentPage = 1;
  }

  paginateAirports(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredAirports.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredAirports.length / this.itemsPerPage);
  }

  getPaginationRange(): number[] {
    const totalPages = this.getTotalPages();
    const current = this.currentPage;
    const range: number[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      range.push(1);
      
      if (current > 3) {
        range.push(-1);
      }
      
      for (let i = Math.max(2, current - 1); i <= Math.min(current + 1, totalPages - 1); i++) {
        range.push(i);
      }
      
      if (current < totalPages - 2) {
        range.push(-1);
      }
      
      range.push(totalPages);
    }
    
    return range;
  }
}
