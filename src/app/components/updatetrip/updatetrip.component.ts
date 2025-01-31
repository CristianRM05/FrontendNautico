import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { ShipService } from '../../services/ship.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-updatetrip',
  templateUrl: './updatetrip.component.html',
  styleUrls: ['./updatetrip.component.css'],
  standalone: false,
})
export class UpdatetripComponent implements OnInit {
  tripId: string | null = null;
  form = {
    fechayHora: '',
    description: '',
    shipId: '',
  };
  ships: any[] = [];  // Lista de barcos disponibles

  constructor(
    private tripService: TripService,
    private shipService: ShipService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tripId = params.get('id');
      if (this.tripId) {
        this.getTripDetails(this.tripId);
      }
      this.getShips();  // Obtener la lista de barcos
    });
  }

  // Obtener los detalles del viaje
  getTripDetails(id: string) {
    this.tripService.getTripById(Number(id)).subscribe(

      (data) => {
        console.log('Detalles del viaje traidos:', data),
        this.form.fechayHora = data.fechayHora;
        this.form.description = data.description;
        this.form.shipId = data.barcoId;
      },
      (error) => {
        console.error('Error al obtener los detalles del viaje', error);
        this.alertService.showAlert('No se pudo obtener el viaje');
      }
    );
  }

  // Obtener la lista de barcos
  getShips() {
    this.shipService.getShips().subscribe(
      (data) => {
        this.ships = data;
      },
      (error) => {
        console.error('Error al obtener los barcos', error);
        this.alertService.showAlert('No se pudieron obtener los barcos');
      }
    );
  }

  // Actualizar el viaje
  updateTrip() {
    if (this.tripId) {
      this.tripService.updateTrip(this.tripId, this.form).subscribe(
        (data) => {
          this.alertService.showAlert('Viaje actualizado con éxito');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error al actualizar el viaje', error);
          this.alertService.showAlert('Hubo un error al actualizar el viaje');
        }
      );
    }
  }
}
