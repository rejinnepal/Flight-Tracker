import { Injectable } from '@angular/core';
import { 
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    // Listen for auth state changes
    onAuthStateChanged(this.auth, (user) => {
      console.log('Auth state changed:', user);
      this.userSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      if (result.user) {
        await this.router.navigate(['/']);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      throw this.handleError(error);
    }
  }

  async register(email: string, password: string): Promise<boolean> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      if (result.user) {
        await this.router.navigate(['/']);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      await this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw this.handleError(error);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      return this.user$.subscribe(user => {
        observer.next(!!user);
      });
    });
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  private handleError(error: any): string {
    console.error('Auth Error:', error);
    
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'Email already registered';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed';
      case 'auth/network-request-failed':
        return 'Network error - please check your connection';
      default:
        return 'An error occurred during authentication';
    }
  }
} 