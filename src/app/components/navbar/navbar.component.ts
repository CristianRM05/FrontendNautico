import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  role: string = '';  // Variable para almacenar el rol
  username: string = ''; // Para mostrar el nombre de usuario



  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (data) => {

        this.username = data.username;
        this.role = data.role;
      },
      (error) => {

      }
    );
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
