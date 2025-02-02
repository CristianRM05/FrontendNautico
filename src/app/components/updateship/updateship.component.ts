import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipService } from '../../services/ship.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateship',
  standalone: false,

  templateUrl: './updateship.component.html',
  styleUrl: './updateship.component.css'
})
export class UpdateshipComponent implements OnInit {
  shipForm!: FormGroup;
  shipId!: number;

  constructor(
    private fb: FormBuilder,
    private shipService: ShipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del barco desde la URL
    this.shipId = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario con validaciones
    this.shipForm = this.fb.group({
      name: ['', Validators.required],
      matricula: ['', Validators.required],
      amarre: ['', [Validators.required, Validators.min(1)]],
      fee: ['', [Validators.required, Validators.min(0)]]
    });

    // Cargar datos del barco
    this.loadShipData();
  }

  // Cargar los datos del barco en el formulario
  loadShipData(): void {
    this.shipService.getShips().subscribe(ships => {
      const ship = ships.find(s => s.id === this.shipId);
      if (ship) {
        this.shipForm.patchValue(ship);
      }
    });
  }

  // Método para actualizar el barco
  updateShip(): void {
    if (this.shipForm.valid) {
      this.shipService.updateShip(this.shipId, this.shipForm.value).subscribe({
        next: () => {
          alert('Barco actualizado correctamente');
          this.router.navigate(['/dashboard']); // Redirige a la página principal
        },
        error: err => {

          alert('Error al actualizar el barco');
        }
      });
    }
  }
}
