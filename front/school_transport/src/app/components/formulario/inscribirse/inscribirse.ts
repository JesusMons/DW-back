import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Ruta {
  id: string; nombre: string;
}
export interface Itinerario {
  id: string; rutaId: string; fecha: string; hora: string;
}
export interface Estudiante {
  id: string; nombre: string; grado: string;
}

@Component({
  selector: 'app-inscribirse',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inscribirse.html',
  styleUrls: ['./inscribirse.css']
})
export class Inscribirse {
  // Mock de datos
  rutas: Ruta[] = [
    { id: 'R-001', nombre: 'Mañana Norte' },
    { id: 'R-002', nombre: 'Tarde Sur' },
    { id: 'R-003', nombre: 'Mañana Oeste' },
  ];

  itinerarios: Itinerario[] = [
    { id: 'IT-101', rutaId: 'R-001', fecha: '2025-09-15', hora: '06:30' },
    { id: 'IT-102', rutaId: 'R-001', fecha: '2025-09-16', hora: '06:30' },
    { id: 'IT-201', rutaId: 'R-002', fecha: '2025-09-15', hora: '15:10' },
    { id: 'IT-301', rutaId: 'R-003', fecha: '2025-09-15', hora: '06:50' },
  ];

  estudiantes: Estudiante[] = [
    { id: 'ST-001', nombre: 'Laura Pérez',  grado: '6°A' },
    { id: 'ST-002', nombre: 'Carlos Gómez', grado: '7°B' },
    { id: 'ST-003', nombre: 'María Rivas',  grado: '8°A' },
  ];

  // Modelo del formulario
  form = {
    rutaId: '',
    itinerarioId: '',
    estudianteId: '',
    observaciones: ''
  };

  creado = false;

  // Itinerarios filtrados por ruta seleccionada
  get itinerariosFiltrados(): Itinerario[] {
    if (!this.form.rutaId) return [];
    return this.itinerarios.filter(i => i.rutaId === this.form.rutaId);
  }

  // Si cambia la ruta, limpiamos el itinerario
  onRutaChange() {
    this.form.itinerarioId = '';
  }

  enviar(f: NgForm) {
    if (f.invalid) return;

    // Aquí iría el POST a tu backend
    // this.http.post('/api/inscripciones', this.form).subscribe(...)

    this.creado = true;

    // Limpiar luego de mostrar OK (simulación)
    setTimeout(() => {
      f.resetForm({
        rutaId: '',
        itinerarioId: '',
        estudianteId: '',
        observaciones: ''
      });
      this.creado = false;
    }, 1500);
  }
}
