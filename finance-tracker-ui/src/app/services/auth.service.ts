import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest, AuthUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = 'http://localhost:8080/api/auth';

  currentUser = signal<AuthUser | null>(this.loadUser());

  private loadUser(): AuthUser | null {
    const email = localStorage.getItem('email');
    const displayName = localStorage.getItem('displayName');
    if (email && displayName) return { email, displayName };
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(request: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  register(request: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  private storeAuth(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('email', res.email);
    localStorage.setItem('displayName', res.displayName);
    this.currentUser.set({ email: res.email, displayName: res.displayName });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('displayName');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}