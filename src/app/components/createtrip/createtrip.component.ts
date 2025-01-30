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
    shipId: '',  // Esto ahora será un ID seleccionado del <select>
  };

  constructor(
    private tripService: TripService,
    private shipService: ShipService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getShips();  // Obtener la lista de barcos al iniciar el componente
  }

  getShips() {
    this.shipService.getShips().subscribe(
      (data) => {
        console.log('Barcos obtenidos:', data);
        this.ships = data;  // Asignar los barcos a la variable `ships`
      },
      (error) => {
        console.error('Error al obtener los barcos', error);
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
        console.error('Error:', err);
        this.alertService.showAlert(err.error);
      },
    });
  }
}
