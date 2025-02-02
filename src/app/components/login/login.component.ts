import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  form = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private alertService: AlertService,
    private router: Router
  ) {}
  login() {
    this.authService.authenticate(this.form).subscribe({
      next: (response) => {
        // Verifica si la respuesta contiene un token
        if (response.token) {
          this.tokenService.setToken(response.token); 
          this.alertService.showAlert('¡Bienvenido! Autenticación exitosa.');
          this.router.navigate(['/dashboard']);
        } else {
          this.alertService.showAlert('No se recibió un token. Intenta de nuevo.');
        }
      },
      error: (err) => {
        this.alertService.showAlert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      },
    });
  }

}
