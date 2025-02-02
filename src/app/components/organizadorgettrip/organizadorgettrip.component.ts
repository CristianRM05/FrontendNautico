import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-organizadorgettrip',
  standalone: false,

  templateUrl: './organizadorgettrip.component.html',
  styleUrl: './organizadorgettrip.component.css'
})
export class OrganizadorgettripComponent {
  constructor(private tripervice:TripService, private router:Router, private alertService:AlertService){
    }
    trips: any[] = [];
    ngOnInit(): void {
        this.tripervice.gettALLPending().subscribe(
        (data) => {
          console.log('Pemding  traidos', data);
          this.trips = data;
        },
        (error) => {
          console.error('Error al obtener los trip', error);
        }
      );
    }

    getTripRoleClass(role: string): string {
      switch (role) {
        case 'PENDING': return 'bg-warning text-dark';
        case 'FINISHED': return 'bg-success text-white';
        default: return 'bg-secondary text-white';
      }
    }
    updateTrip(tripId: number): void {
      console.log('Navigating to update-trip with id:', tripId);
      if (tripId) {
        this.router.navigate(['/update-trip', tripId]);
      } else {
        console.error('Invalid tripId:', tripId);
      }
    }

}
