import { Injectable } from '@angular/core';
import { LoginResponse } from '../interfaces/auth';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environment/environment.proud';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //  private apiUrl = 'https://localhost:7071/api/Auth';
  private apiUrl = `${environment.apiUrl}Auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {          // ← ab res ka type LoginResponse hoga
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('email', res.email);
          localStorage.setItem('fullName', res.fullName);
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getFullName(): string {
    return localStorage.getItem('fullName') ?? '';
  }
}
