import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

type Estado = 'ACTIVO' | 'INACTIVO';

export interface Conductor {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  licencia: string;       // C1, C2, A2…
  venceLicencia: string;  // YYYY-MM-DD
  estado: Estado;
}

@Component({
  selector: 'app-crear-conductor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-conductor.html',
  styleUrls: ['./crear-conductor.css']
})
export class CrearConductor {
  creado = false;

  licencias = ['C1', 'C2', 'C3', 'A1', 'A2', 'B1', 'B2'];
  estados: Estado[] = ['ACTIVO', 'INACTIVO'];

  conductor: Conductor = {
    id: '',
    nombre: '',
    documento: '',
    telefono: '',
    licencia: 'C1',
    venceLicencia: '',
    estado: 'ACTIVO'
  };

  constructor(private router: Router) {}

  crear(f: NgForm) {
    if (f.invalid) return;

    // SIMULACIÓN: aquí iría tu this.http.post(...)
    this.creado = true;

    // Redirigir al listado tras mostrar OK
    setTimeout(() => this.router.navigate(['/conductores']), 1500);
  }

  limpiar(f: NgForm) {
    f.resetForm({
      id: '',
      nombre: '',
      documento: '',
      telefono: '',
      licencia: 'C1',
      venceLicencia: '',
      estado: 'ACTIVO'
    });
    this.creado = false;
  }
}
