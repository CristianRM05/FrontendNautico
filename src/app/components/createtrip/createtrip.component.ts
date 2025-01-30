import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-createtrip',
  standalone: false,

  templateUrl: './createtrip.component.html',
  styleUrl: './createtrip.component.css'
})
export class CreatetripComponent {

  constructor(private tripervice:TripService, private router:Router, private alertService:AlertService){

  }
fechaActual = new Date();
 fechaFormatoISO = this.fechaActual.toISOString().slice(0, 19);

  form = {
    fechayHora: this.fechaFormatoISO,
    description: '',
    shipId: '',

  };

  register() {
    this.tripervice.register(this.form).subscribe({
      next: () => {
        this.alertService.showAlert('Ya has creado el viaje , a espera de asignación');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error:', err);
        this.alertService.showAlert(err.error);
      },
    });
  }


}
