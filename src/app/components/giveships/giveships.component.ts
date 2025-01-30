import { Component, OnInit } from '@angular/core';
import { ShipService } from '../../services/ship.service';

@Component({
  selector: 'app-giveships',
  standalone: false,
  templateUrl: './giveships.component.html',
  styleUrls: ['./giveships.component.css']
})
export class GiveshipsComponent implements OnInit {
  ships: any[] = [];  // Arreglo para almacenar los barcos

  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    // Llamada al servicio para obtener todos los barcos
    this.shipService.getShips().subscribe(
      (data) => {
        console.log('Barcos Traídos:', data);
        this.ships = data;  // Almacena la lista de barcos en el arreglo
      },
      (error) => {
        console.error('Error al obtener los barcos', error);
      }
    );
  }
}
