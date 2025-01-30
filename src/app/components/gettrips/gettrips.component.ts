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
        console.log('Trips traidos', data);
        this.trips = data;
      },
      (error) => {
        console.error('Error al obtener los trip', error);
      }
    );
  }
  updateTrip(id: number) {
    this.router.navigate([`/updatetrip/${id}`]); // Esto redirige al formulario de actualización
  }


 }
