import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateuser',
  standalone: false,

  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent {
  username: any;
  lastname: any;
  role: any;
  name: any;
  showModal: boolean = false;
  constructor(private authService:AuthService, private router:Router) { }
  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (data) => {

        this.username = data.username;
        this.name = data.name;
        this.lastname = data.lastname;
        this.role=data.role;

        console.log('Usuario en update:', data);

      },
      (error) => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }
  showCookieConsent(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
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
        console.error('Error al actualizar usuario', error);
        alert('Hubo un error al actualizar el perfil');
      }
    );
  }

}

