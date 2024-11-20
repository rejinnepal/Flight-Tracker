import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AirlinesService } from '../../backend/airlines.service';

@Component({
  selector: 'app-airline-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {
  airlines: any[] = [];
  filteredAirlines: any[] = [];
  searchCode: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  sortField: string = 'name'; // Default sort field
  currentPage: number = 1;
  itemsPerPage: number = 12;
  Math = Math;

  constructor(private airlinesService: AirlinesService) {}

  ngOnInit() {
    this.loadAirlines();
  }

  loadAirlines(): void {
    this.isLoading = true;
    this.airlinesService.getAirlines().subscribe({
      next: (data: any) => {
        console.log('Raw API response:', data);
        if (Array.isArray(data)) {
          this.airlines = data;
        } else if (data.data && Array.isArray(data.data)) {
          this.airlines = data.data;
        } else {
          console.error('Unexpected API response format:', data);
          this.errorMessage = 'Invalid data format received from API';
        }
        this.filteredAirlines = this.airlines;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading airlines data:', error);
        this.errorMessage = 'Failed to load airlines data. ' + (error.message || '');
        this.isLoading = false;
      }
    });
  }

  searchAirlines(): void {
    if (!this.searchCode) {
      this.loadAirlines(); // Refresh data when search is cleared
      return;
    }
    
    const searchValue = this.searchCode.toLowerCase();
    this.filteredAirlines = this.airlines.filter(airline => {
      const matches = 
        (airline.codeIcaoAirline?.toLowerCase()?.includes(searchValue)) ||
        (airline.codeIataAirline?.toLowerCase()?.includes(searchValue)) ||
        (airline.nameAirline?.toLowerCase()?.includes(searchValue));
      return matches;
    });

    if (this.filteredAirlines.length === 0) {
      this.errorMessage = `No airlines found matching "${this.searchCode}"`;
    } else {
      this.errorMessage = '';
    }
    
    // Reset to first page when search results change
    this.currentPage = 1;
  }

  sortAirlines(): void {
    const fieldMapping: { [key: string]: string } = {
      'name': 'nameAirline',
      'icaoCode': 'codeIcaoAirline',
      'iataCode': 'codeIataAirline'
    };

    const actualField = fieldMapping[this.sortField] || this.sortField;
    
    this.filteredAirlines.sort((a, b) => {
      if (!a[actualField]) return 1;
      if (!b[actualField]) return -1;
      if (a[actualField].toLowerCase() < b[actualField].toLowerCase()) return -1;
      if (a[actualField].toLowerCase() > b[actualField].toLowerCase()) return 1;
      return 0;
    });
  }

  paginateAirlines(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredAirlines.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredAirlines.length / this.itemsPerPage);
  }

  getPaginationRange(): number[] {
    const totalPages = this.getTotalPages();
    const current = this.currentPage;
    const range: number[] = [];
    
    if (totalPages <= 7) {
      // If total pages is 7 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Always include first page
      range.push(1);
      
      if (current > 3) {
        range.push(-1); // Add ellipsis
      }
      
      // Add pages around current page
      for (let i = Math.max(2, current - 1); i <= Math.min(current + 1, totalPages - 1); i++) {
        range.push(i);
      }
      
      if (current < totalPages - 2) {
        range.push(-1); // Add ellipsis
      }
      
      // Always include last page
      range.push(totalPages);
    }
    
    return range;
  }
}
