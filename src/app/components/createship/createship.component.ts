import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ShipService } from '../../services/ship.service';

@Component({
  selector: 'app-createship',
  standalone: false,
  templateUrl: './createship.component.html',
  styleUrls: ['./createship.component.css']
})
export class CreateshipComponent {

  // Un conjunto para almacenar los números de amarre ya generados
  private amarreNumbers: Set<number> = new Set<number>();

  constructor(private shipService: ShipService, private router: Router, private alertService: AlertService) { }

  form = {
    name: '',
    matricula: '',
    amarre: 0,
    fee: 0
  };

  generateAmarre() {
    let randomAmarre;
    // Generamos un número aleatorio entre 1000 y 9999 hasta que no se repita
    do {
      randomAmarre = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    } while (this.amarreNumbers.has(randomAmarre));
    this.amarreNumbers.add(randomAmarre);
    return randomAmarre;
  }


  generateFee() {
    return Math.floor(Math.random() * (600 - 150 + 1)) + 150;
  }

  ngOnInit() {
    // Generamos y asignamos los valores aleatorios de amarre y fee al formulario
    this.form.amarre = this.generateAmarre();
    this.form.fee = this.generateFee();
  }

  // Método de registro
  register() {
    // Llamamos al servicio para registrar el barco
    this.shipService.register(this.form).subscribe({
      next: () => {
        this.alertService.showAlert('Registro exitoso. Ya has agregado tu barco al club.');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.alertService.showAlert(err.error);
      },
    });
  }
}
