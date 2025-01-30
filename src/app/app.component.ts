import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'FrontAng';
  private publicRoutes = ['/login', '/register'];
  constructor(private tokenService: TokenService,private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.publicRoutes.includes(event.url)) {
          return;
        }
        // Validar el token solo en rutas privadas
        this.tokenService.checkTokenValidity().subscribe(isValid => {
          if (!isValid) {
            console.log('Token is invalid or expired');
            this.tokenService.removeToken();
            this.router.navigate(['/login']);
          } else {
            console.log('Token is valid');
          }
        });
      }
    });
  }
}
