// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8085/api/auth'; // URL del backend

  constructor(private http: HttpClient) {}

  // Registro de usuario
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Autenticación (Login)
  authenticate(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, data);

  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Método para obtener el token (si lo necesitas)
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
