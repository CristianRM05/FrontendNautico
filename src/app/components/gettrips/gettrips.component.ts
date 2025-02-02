import { Component } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-gettrips',
  standalone: false,

  templateUrl: './gettrips.component.html',
  styleUrl: './gettrips.component.css'
})
export class GettripsComponent {
  constructor(private tripervice:TripService, private router:Router, private alertService:AlertService){

    }
    trips: any[] = [];


   ngOnInit(): void {
    // Llamada al servicio para obtener todos los barcos
    this.tripervice.getTrips().subscribe(
      (data) => {
        this.trips = data;
      },
      (error) => {
        this.alertService.showAlert('Error al obtener los trip'+ error.error);
      }
    );
  
  }
  updateTrip(id: number) {
    this.router.navigate(['/updatetrip', id]);
  }
  deleteTrip(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este trip?')) {
      this.tripervice.deleteTrip(id).subscribe({
        next: () => {
          this.alertService.showAlert('Trip eliminado correctamente.');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.alertService.showAlert('Error al eliminar el trip.' +err.error);
        },
      });
    }
  }
  getTripRoleClass(role: string): string {
    switch (role) {
      case 'PENDING': return 'bg-warning text-dark';
      case 'FINISHED': return 'bg-success text-white';
      default: return 'bg-secondary text-white';
    }
  }



 }
