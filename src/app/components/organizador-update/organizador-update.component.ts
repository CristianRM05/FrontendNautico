import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ShipService } from '../../services/ship.service';
import { TripService } from '../../services/trip.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-organizador-update',
  standalone: false,

  templateUrl: './organizador-update.component.html',
  styleUrl: './organizador-update.component.css'
})
export class OrganizadorUpdateComponent {
  idTrip!: number;
  patrons: any[] = [];
  selectedPatron!: number;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
    private userService:AuthService
  ) {}

  ngOnInit(): void {
    
    this.idTrip = Number(this.route.snapshot.paramMap.get('idTrip'));

    // Cargar la lista de patrones
    this.userService.getPatrons().subscribe((data) => {
      this.patrons = data;

    });
  }

  updateOrganizer(): void {
    if (!this.selectedPatron) {
      alert('Selecciona un patrón antes de actualizar.');
      return;
    }

    this.tripService.updateTripOrganizador(this.idTrip, this.selectedPatron).subscribe({
      next: () => {
        alert('Organizador actualizado correctamente');
        this.router.navigate(['/tripOrganizador']); // Redirige a la lista de viajes
      },
      error: (err) => {
        alert('Error al actualizar el organizador: ' + err.error);
      }
    });
  }
}
