import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  selector: 'app-mostrar-estudi-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mostrar-estudi-detalle.html',
  styleUrls: ['./mostrar-estudi-detalle.css']
})
export class MostrarEstudiDetalle {
  cargando = true;
  estudiante?: Estudiante;

  private mockDB: Estudiante[] = [
    { id: 'ST-001', nombre: 'Laura Pérez',  documento: '1001234567', grado: '6°A', acudiente: 'Ana Pérez',   telefono: '3001234567', estado: 'ACTIVO' },
    { id: 'ST-002', nombre: 'Carlos Gómez', documento: '1002345678', grado: '7°B', acudiente: 'Luis Gómez',  telefono: '3012345678', estado: 'ACTIVO' },
    { id: 'ST-003', nombre: 'María Rivas',  documento: '1003456789', grado: '8°A', acudiente: 'Julia Rivas', telefono: '3023456789', estado: 'INACTIVO' },
  ];

  constructor(private ar: ActivatedRoute, private router: Router) {
    const id = this.ar.snapshot.paramMap.get('id') ?? '';

    let found = this.mockDB.find(e => e.id === id);

    if (!found && id) {
      // Generar uno temporal si no existe
      found = {
        id,
        nombre: 'Estudiante no registrado',
        documento: '',
        grado: '',
        acudiente: '',
        telefono: '',
        estado: 'INACTIVO'
      };
    }

    this.estudiante = found;
    this.cargando = false;
  }

  volver() {
    this.router.navigate(['/estudiantes']);
  }
}
