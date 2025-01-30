import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private baseUrl = 'http://localhost:8085/api/barcos'; // URL del backend

  constructor(private http: HttpClient, private router: Router) {}

  // Registro de barco
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Obtener todos los barcos
  getShips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/traer`);  // Cambié a un arreglo de barcos
  }
}
