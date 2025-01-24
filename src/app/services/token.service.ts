// src/app/services/token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'auth-token';

  setToken(token: string): void {
    console.log('Guardando token en localStorage:', token); // Verifica que el token esté llegando aquí
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Obteniendo token de localStorage:', token); // Verifica que el token se obtiene correctamente
    return token;
  }


  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
