import { Component, OnInit } from '@angular/core';
import { ShipService } from '../../services/ship.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-giveships',
  standalone: false,
  templateUrl: './giveships.component.html',
  styleUrls: ['./giveships.component.css']
})
export class GiveshipsComponent implements OnInit {
  ships: any[] = [];

  constructor(private shipService: ShipService, private alertService:AlertService) { }

  ngOnInit(): void {
    this.shipService.getShips().subscribe(
      (data) => {
        this.ships = data;
      },
      (error) => {
        this.alertService.showAlert('Error al obtener los barcos'+ error.error);
      }
    );
  }
  deleteShip(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este barco?')) {
      this.shipService.deleteShip(id).subscribe({
        next: () => {
          this.alertService.showAlert('Barco eliminado correctamente.');
          this.ships = this.ships.filter((ship) => ship.id !== id);
        },
        error: (err) => {

          this.alertService.showAlert('Error al eliminar el barco.'+ err.error);
        },
      });
    }
  }
}
