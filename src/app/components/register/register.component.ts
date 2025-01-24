import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
})
export class RegisterComponent {
  form = {
    name: '',
    lastname: '',
    username: '',
    password: '',
    role: '0',
    isPatron: false,
  };

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  register() {
    this.authService.register(this.form).subscribe({
      next: () => {
        this.alertService.showAlert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']); // Redirige al login
      },
      error: (err) => {
        console.error('Error:', err);
        this.alertService.showAlert('Error al registrar el usuario.');
      },
    });
  }
}
