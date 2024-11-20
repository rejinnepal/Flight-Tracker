import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../backend/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(authenticated => {
        if (authenticated) {
          return true;
        }
        
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
} 