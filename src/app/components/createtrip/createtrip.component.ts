import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { TripService } from '../../services/trip.service';
import { ShipService } from '../../services/ship.service';

@Component({
  selector: 'app-createtrip',
  standalone: false,
  templateUrl: './createtrip.component.html',
  styleUrls: ['./createtrip.component.css']
})
export class CreatetripComponent implements OnInit {
  ships: any[] = [];  // Lista de barcos
  form = {
    fechayHora: new Date().toISOString().slice(0, 19),
    description: '',
    shipId: '',
  };

  constructor(
    private tripService: TripService,
    private shipService: ShipService,
    private router: Router,
    private alertService: AlertService
  ) {}
  minDateTime: string = '';
  ngOnInit(): void {
    this.getShips();
    this.setMinDateTime();
  }

  getShips() {
    this.shipService.getShips().subscribe(
      (data) => {
        
        this.ships = data;
      },
      (error) => {
        this.alertService.showAlert('No se pudieron obtener los barcos.');
      }
    );
  }

  register() {
    this.tripService.register(this.form).subscribe({
      next: () => {
        this.alertService.showAlert('Viaje creado con éxito. A espera de asignación.');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.alertService.showAlert(err.error);
      },
    });
  }
  setMinDateTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Ajuste de zona horaria
    this.minDateTime = now.toISOString().slice(0, 16);
  }
}
