import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ShipService } from '../../services/ship.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-organizador-update',
  standalone: false,

  templateUrl: './organizador-update.component.html',
  styleUrl: './organizador-update.component.css'
})
export class OrganizadorUpdateComponent {
 tripId: string | null = null;
  form = {
    fechayHora: '',
    description: '',
    shipId: '',
  };
  ships: any[] = [];
  minDateTime: string = '';

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
      this.getShips();
    });
  }

  selectedShip: any = null;

  getTripDetails(id: string) {
    this.tripService.getTripById(Number(id)).subscribe(
      (data) => {
        this.form.patronId = data.fechayHora;
        this.form.description = data.description;
        this.form.shipId = data.barcoId;

        // Buscar el barco en la lista de barcos
        this.shipService.getShips().subscribe((ships) => {
          this.selectedShip = ships.find((ship) => ship.id === this.form.shipId);
        });
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
          this.alertService.showAlert(error.error);
        }
      );
    }
  }
}
