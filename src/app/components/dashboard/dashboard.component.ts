import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TripService } from '../../services/trip.service';
import { ShipService } from '../../services/ship.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    role: string = '';  // Variable para almacenar el rol
    username: string = ''; // Para mostrar el nombre de usuario
    barcos: any[] = [];
    viajes: any[] = [];
    constructor(private authService: AuthService, private tripService:TripService, private shipService:ShipService) {}
  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (data) => {
        console.log('Usuario obtenido:', data);
        this.username = data.username;
        this.role = data.role;
        this.getBarcos();
        this.getViajes();
      },
      (error) => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }
  getBarcos() {
    this.shipService.getShips().subscribe((data: any) => {
      this.barcos = data;
    });
  }

  // Método para obtener los viajes del usuario
  getViajes() {
    this.tripService.getTrips().subscribe((data: any) => {
      this.viajes = data;
    });
  }
}
