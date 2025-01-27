import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'FrontAng';
  constructor(private tokenService: TokenService,private router: Router) {}

  ngOnInit() {
    this.tokenService.checkTokenValidity().subscribe(isValid => {
      if (!isValid) {
        console.log('Token is invalid or expired');
        this.router.navigate(['/login']);
        this.tokenService.removeToken();
      } else {
        console.log('Token is valid');
        // Continúa con la lógica de la aplicación
      }
    });
  }
}
