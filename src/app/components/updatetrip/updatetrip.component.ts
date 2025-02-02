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
  ships: any[] = [];
  minDateTime: string = '';

  constructor(
    private tripService: TripService,
    private shipService: ShipService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setMinDateTime() {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  // Verificar si la fecha es futura
  isFutureDate(): boolean {
    if (!this.form.fechayHora) return false;
    const selectedDate = new Date(this.form.fechayHora);
    return selectedDate > new Date();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tripId = params.get('id');
      if (this.tripId) {
        this.getTripDetails(this.tripId);
      }
      this.getShips();  // Obtener la lista de barcos
    });
  }

  selectedShip: any = null;

  getTripDetails(id: string) {
    this.tripService.getTripById(Number(id)).subscribe(
      (data) => {
        this.form.fechayHora = data.fechayHora;
        this.form.description = data.description;
        this.form.shipId = data.barcoId;

        // Buscar el barco en la lista de barcos
        this.shipService.getShips().subscribe((ships) => {
          this.selectedShip = ships.find((ship) => ship.id === this.form.shipId);
        });
      },
      (error) => {
  
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

          this.alertService.showAlert(error.error);
        }
      );
    }
  }
}
