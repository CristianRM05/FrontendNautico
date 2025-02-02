import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateuser',
  standalone: false,
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {
  username: any;
  lastname: any;
  role: any;
  name: any;
  showModal: boolean = false; // Asegúrate de que sea 'false' en lugar de 'null'

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (data) => {
        this.username = data.username;
        this.name = data.name;
        this.lastname = data.lastname;
        this.role = data.role;
      }

    );
  }

  showCookieConsent(): void {
    this.showModal = true; // Asigna 'true' para mostrar el modal
  }

  closeModal(): void {
    this.showModal = false; // Asigna 'false' para cerrar el modal
  }

  updateUser() {
    let updatedUser = {
      name: this.name,
      lastname: this.lastname,
      username: this.username
    };

    this.authService.updateUser(updatedUser).subscribe(
      response => {
        console.log('Usuario actualizado:', response);
        this.router.navigate(['/dashboard']);
      },
      error => {

        alert('Hubo un error al actualizar el perfil' + error.error);
      }
    );
  }
}
