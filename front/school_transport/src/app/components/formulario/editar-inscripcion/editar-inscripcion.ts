import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

export interface Ruta { id: string; nombre: string; }
export interface Itinerario { id: string; rutaId: string; fecha: string; hora: string; }
export interface Estudiante { id: string; nombre: string; grado: string; }
export interface Inscripcion {
  id: string;
  rutaId: string;
  itinerarioId: string;
  estudianteId: string;
  observaciones?: string;
  fechaRegistro: string;
}

@Component({
  selector: 'app-editar-inscripcion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-inscripcion.html',
  styleUrls: ['./editar-inscripcion.css']
})
export class EditarInscripcion {
  cargando = true;
  guardado = false;

  rutas: Ruta[] = [
    { id: 'R-001', nombre: 'Mañana Norte' },
    { id: 'R-002', nombre: 'Tarde Sur' },
    { id: 'R-003', nombre: 'Mañana Oeste' },
  ];
  itinerarios: Itinerario[] = [
    { id: 'IT-101', rutaId: 'R-001', fecha: '2025-09-15', hora: '06:30' },
    { id: 'IT-201', rutaId: 'R-002', fecha: '2025-09-15', hora: '15:10' },
    { id: 'IT-301', rutaId: 'R-003', fecha: '2025-09-15', hora: '06:50' },
  ];
  estudiantes: Estudiante[] = [
    { id: 'ST-001', nombre: 'Laura Pérez', grado: '6°A' },
    { id: 'ST-002', nombre: 'Carlos Gómez', grado: '7°B' },
    { id: 'ST-003', nombre: 'María Rivas', grado: '8°A' },
  ];

  inscripcion: Inscripcion = {
    id: '',
    rutaId: '',
    itinerarioId: '',
    estudianteId: '',
    observaciones: '',
    fechaRegistro: ''
  };

  private mockDB: Inscripcion[] = [
    { id: 'INS-001', rutaId: 'R-001', itinerarioId: 'IT-101', estudianteId: 'ST-001', observaciones: 'Silla delantera', fechaRegistro: '2025-09-10' },
    { id: 'INS-002', rutaId: 'R-002', itinerarioId: 'IT-201', estudianteId: 'ST-002', fechaRegistro: '2025-09-11' },
  ];

  constructor(private ar: ActivatedRoute, private router: Router) {
    const id = this.ar.snapshot.paramMap.get('id') ?? '';
    let found = this.mockDB.find(x => x.id === id);

    if (!found && id) {
      found = {
        id,
        rutaId: '',
        itinerarioId: '',
        estudianteId: '',
        observaciones: '',
        fechaRegistro: new Date().toISOString().slice(0,10)
      };
      this.mockDB.push(found);
    }

    if (found) this.inscripcion = { ...found };
    this.cargando = false;
  }

  get itinerariosFiltrados(): Itinerario[] {
    if (!this.inscripcion.rutaId) return [];
    return this.itinerarios.filter(i => i.rutaId === this.inscripcion.rutaId);
  }

  onRutaChange() {
    this.inscripcion.itinerarioId = '';
  }

  guardar(f: NgForm) {
    if (f.invalid) return;

    const idx = this.mockDB.findIndex(x => x.id === this.inscripcion.id);
    if (idx >= 0) this.mockDB[idx] = { ...this.inscripcion };

    this.guardado = true;
    setTimeout(() => this.router.navigate(['/inscritos']), 1500);
  }

  cancelar() {
    this.router.navigate(['/inscritos']);
  }
}
