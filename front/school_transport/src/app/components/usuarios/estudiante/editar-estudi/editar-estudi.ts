import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

type Estado = 'ACTIVO' | 'INACTIVO';

export interface Estudiante {
  id: string;
  nombre: string;
  documento: string;
  grado: string;
  acudiente: string;
  telefono: string;
  estado: Estado;
}

@Component({
  selector: 'app-editar-estudi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-estudi.html',
  styleUrls: ['./editar-estudi.css']
})
export class EditarEstudi {
  cargando = true;
  guardado = false;

  estudiante: Estudiante = {
    id: '',
    nombre: '',
    documento: '',
    grado: '',
    acudiente: '',
    telefono: '',
    estado: 'ACTIVO'
  };

  estados: Estado[] = ['ACTIVO', 'INACTIVO'];

  // Mock local de "BD"
  private mockDB: Estudiante[] = [
    { id: 'ST-001', nombre: 'Laura Pérez',  documento: '1001234567', grado: '6°A', acudiente: 'Ana Pérez',   telefono: '3001234567', estado: 'ACTIVO' },
    { id: 'ST-002', nombre: 'Carlos Gómez', documento: '1002345678', grado: '7°B', acudiente: 'Luis Gómez',  telefono: '3012345678', estado: 'ACTIVO' },
    { id: 'ST-003', nombre: 'María Rivas',  documento: '1003456789', grado: '8°A', acudiente: 'Julia Rivas', telefono: '3023456789', estado: 'INACTIVO' },
  ];

  constructor(private ar: ActivatedRoute, private router: Router) {
    const id = this.ar.snapshot.paramMap.get('id') ?? '';

    let found = id ? this.mockDB.find(e => e.id === id) : undefined;

    // Si no existe, autogenerar en simulación para poder editar
    if (!found && id) {
      found = {
        id,
        nombre: '',
        documento: '',
        grado: '',
        acudiente: '',
        telefono: '',
        estado: 'ACTIVO'
      };
      this.mockDB.push(found);
    }

    if (found) this.estudiante = { ...found };

    this.cargando = false;
  }

  guardar(form: NgForm) {
    if (form.invalid) return;

    // Simular actualización en "BD"
    const idx = this.mockDB.findIndex(e => e.id === this.estudiante.id);
    if (idx >= 0) this.mockDB[idx] = { ...this.estudiante };

    this.guardado = true;

    // Redirigir al listado tras mostrar el OK
    setTimeout(() => this.router.navigate(['/estudiantes']), 1200);
  }

  cancelar() {
    this.router.navigate(['/estudiantes']);
  }
}
