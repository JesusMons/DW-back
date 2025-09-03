import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

type Severidad = 'BAJA' | 'MEDIA' | 'ALTA';
type Estado = 'ABIERTA' | 'EN PROCESO' | 'CERRADA';

export interface IncidenciaCreate {
  fecha: string;
  hora: string;
  busPlaca: string;
  conductorId: string;
  conductorNombre: string;
  severidad: Severidad;
  estado: Estado;
  descripcion: string;
}

@Component({
  selector: 'app-crear-incidencia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-incidencia.html',
  styleUrls: ['./crear-incidencia.css']
})
export class CrearIncidencia {
  creado = false;

  severidades: Severidad[] = ['BAJA', 'MEDIA', 'ALTA'];
  estados: Estado[] = ['ABIERTA', 'EN PROCESO', 'CERRADA'];

  incidencia: IncidenciaCreate = {
    fecha: new Date().toISOString().slice(0,10), // hoy
    hora: new Date().toTimeString().slice(0,5),  // HH:mm
    busPlaca: '',
    conductorId: '',
    conductorNombre: '',
    severidad: 'BAJA',
    estado: 'ABIERTA',
    descripcion: ''
  };

  constructor(private router: Router) {}

  crear(f: NgForm) {
    if (f.invalid) return;

    // SIMULACIÓN: aquí iría tu POST al backend
    // this.http.post('/api/incidencias', this.incidencia).subscribe(...)
    this.creado = true;

    // Redirigir después de mostrar el OK
    setTimeout(() => this.router.navigate(['/incidencias']), 1500);
  }

  limpiar(f: NgForm) {
    f.resetForm({
      fecha: new Date().toISOString().slice(0,10),
      hora: new Date().toTimeString().slice(0,5),
      busPlaca: '',
      conductorId: '',
      conductorNombre: '',
      severidad: 'BAJA',
      estado: 'ABIERTA',
      descripcion: ''
    });
    this.creado = false;
  }
}
