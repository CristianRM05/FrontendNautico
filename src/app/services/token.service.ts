import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private apiUrl = 'http://localhost:8085/api/auth/validate'; // Cambia esta URL a la de tu backend

  constructor(private http: HttpClient) {}

  // Verifica si el token ha expirado
  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken) {
        return true;
      }
      const expirationTime = decodedToken.exp * 1000; // Convertimos a milisegundos
      return new Date().getTime() > expirationTime;
    } catch (e) {
      return true; // Si hay algún error, consideramos que el token ha expirado
    }
  }



  // Verifica si el token ha expirado llamando al backend
  validateTokenBackend(token: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, { token });
  }

  // Guarda el token en localStorage
 setToken(token: string): void {
  const expirationTime = new Date().getTime() + 1000 * 60 * 60 * 24; // 24 horas desde ahora
  const tokenData = {
    value: token,
    expiresAt: expirationTime
  };
  localStorage.setItem('token', JSON.stringify(tokenData));
}

  // Obtiene el token del localStorage
  getToken(): string | null {
    const tokenData = localStorage.getItem('token');

    if (tokenData) {
      const parsedToken = JSON.parse(tokenData);
      const token = parsedToken.value;

      // Verificamos si el token ha expirado
      if (this.isTokenExpired(token)) {
        this.removeToken();
        return null; // Si ha expirado, devolvemos null
      }

      return token; // Si no ha expirado, devolvemos el token
    }

    return null; // Si no hay token en localStorage, devolvemos null
  }

  // Elimina el token del localStorage
  removeToken(): void {
    localStorage.removeItem('token');
  }
}
