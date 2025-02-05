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
    role: string = '';
    username: string = '';
    barcos: any[] = [];
    viajes: any[] = [];
    viajes2: any[] = [];
    constructor(private authService: AuthService, private tripService:TripService, private shipService:ShipService) {}
  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (data) => {
    
        this.username = data.username;
        this.role = data.role;
        this.getBarcos();
        this.getViajes();
        this.getViajes2();
      },
      (error) => {
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
  getViajes2() {
    this.tripService.gettALLPending().subscribe((data: any) => {
      this.viajes2 = data;
    });
  }
}
