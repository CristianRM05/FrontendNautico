import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ShipService } from '../../services/ship.service';

@Component({
  selector: 'app-createship',
  standalone: false,

  templateUrl: './createship.component.html',
  styleUrl: './createship.component.css'
})
export class CreateshipComponent {

  constructor(private shipService:ShipService, private router:Router, private alertService:AlertService) { }
  form = {
    name: '',
    matricula: '',
    amarre: '',
    fee: '',

  };

  register() {
    this.shipService.register(this.form).subscribe({
      next: () => {
        this.alertService.showAlert('Registro exitoso. Ya has agregado tu barco al club.');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error:', err);
        this.alertService.showAlert('Error al registrar el usuario.');
      },
    });
  }

}
