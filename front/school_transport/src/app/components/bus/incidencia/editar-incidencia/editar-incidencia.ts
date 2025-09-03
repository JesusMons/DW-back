import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

type Severidad = 'BAJA' | 'MEDIA' | 'ALTA';
type Estado = 'ABIERTA' | 'EN PROCESO' | 'CERRADA';

export interface Incidencia {
  id: string;
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
  selector: 'app-editar-incidencia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-incidencia.html',
  styleUrls: ['./editar-incidencia.css']
})
export class EditarIncidencia {
  cargando = true;
  guardado = false;

  severidades: Severidad[] = ['BAJA', 'MEDIA', 'ALTA'];
  estados: Estado[] = ['ABIERTA', 'EN PROCESO', 'CERRADA'];

  incidencia: Incidencia = {
    id: '',
    fecha: '',
    hora: '',
    busPlaca: '',
    conductorId: '',
    conductorNombre: '',
    severidad: 'BAJA',
    estado: 'ABIERTA',
    descripcion: ''
  };

  // Mock local
  private mockDB: Incidencia[] = [
    {
      id: 'INC-001',
      fecha: '2025-09-10',
      hora: '06:45',
      busPlaca: 'ABC-123',
      conductorId: 'CD-001',
      conductorNombre: 'Pedro López',
      severidad: 'MEDIA',
      estado: 'EN PROCESO',
      descripcion: 'Retraso de 15 minutos por trancón en la Av. 10.'
    }
  ];

  constructor(private ar: ActivatedRoute, private router: Router) {
    const id = this.ar.snapshot.paramMap.get('id') ?? '';
    let found = this.mockDB.find(x => x.id === id);

    // Si no existe, crear uno temporal
    if (!found && id) {
      found = {
        id,
        fecha: new Date().toISOString().slice(0, 10),
        hora: '06:30',
        busPlaca: '',
        conductorId: '',
        conductorNombre: '',
        severidad: 'BAJA',
        estado: 'ABIERTA',
        descripcion: ''
      };
      this.mockDB.push(found);
    }

    if (found) this.incidencia = { ...found };
    this.cargando = false;
  }

  guardar(f: NgForm) {
    if (f.invalid) return;

    const idx = this.mockDB.findIndex(x => x.id === this.incidencia.id);
    if (idx >= 0) this.mockDB[idx] = { ...this.incidencia };

    this.guardado = true;
    setTimeout(() => this.router.navigate(['/incidencias']), 1200);
  }

  cancelar() {
    this.router.navigate(['/incidencias']);
  }
}
