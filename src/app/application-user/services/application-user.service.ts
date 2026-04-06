import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUser, RegisterDto } from '../models/user';
import { environment } from 'src/Environment/environment.proud';

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserService {


  //  private apiUrl = 'https://localhost:7071/api/Auth';
  private apiUrl = `${environment.apiUrl}Auth`;
   



  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }

  getAllUsers(): Observable<ApplicationUser[]> {
    return this.http.get<ApplicationUser[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: string): Observable<ApplicationUser> {
    return this.http.get<ApplicationUser>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: string, dto: Partial<RegisterDto>): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, dto);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

}
