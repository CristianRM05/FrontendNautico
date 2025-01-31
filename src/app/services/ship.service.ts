import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private baseUrl = 'http://localhost:8085/api/barcos'; 

  constructor(private http: HttpClient, private router: Router) {}

  // Registro de barco
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Obtener todos los barcos
  getShips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/traer`);
  }
  deleteShip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/borrar/${id}`);
  }
  updateShip(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

}
