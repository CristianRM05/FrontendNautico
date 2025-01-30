import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private apiUrl = 'http://localhost:8085/api/auth/validate'; // Cambia esta URL a la de tu backend

  constructor(private http: HttpClient,private router: Router) {}

  // Verifica si el token ha expirado llamando al backend
  validateTokenBackend(token: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, { token });
  }

  // Guarda el token en localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtiene el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Elimina el token del localStorage
  removeToken(): void {
    localStorage.removeItem('token');
  }

  // Método para verificar y actualizar el estado del token
  checkTokenValidity(): Observable<boolean> {
    let token = this.getToken();
    if (token) {
      return this.validateTokenBackend(token).pipe(
        tap((isValid) => {
          if (!isValid) {
            this.removeToken();

          }
        }),
        catchError((error) => {

          this.removeToken();
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }
}
