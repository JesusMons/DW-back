import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Acudiente {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  direccion: string;
  estudiante: string; // nombre del estudiante asociado
}

@Component({
  selector: 'app-mostrar-acudiente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mostrar-acudiente.html',
  styleUrls: ['./mostrar-acudiente.css']
})
export class MostrarAcudiente {
  // Datos de ejemplo
  private data = signal<Acudiente[]>([
    { id: 'AC-001', nombre: 'Ana Pérez', documento: '900123456', telefono: '3001112222', direccion: 'Calle 123', estudiante: 'Laura Pérez' },
    { id: 'AC-002', nombre: 'Luis Gómez', documento: '900234567', telefono: '3012223333', direccion: 'Carrera 45', estudiante: 'Carlos Gómez' },
    { id: 'AC-003', nombre: 'Julia Rivas', documento: '900345678', telefono: '3023334444', direccion: 'Av. 10', estudiante: 'María Rivas' },
  ]);

  // Buscador
  query = signal<string>('');
  acudientes = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.data();
    return this.data().filter(a => (
      `${a.id} ${a.nombre} ${a.documento} ${a.telefono} ${a.estudiante} ${a.direccion}`
    ).toLowerCase().includes(q));
  });

  // Acciones simuladas
  ver(id: string)    { console.log('Ver acudiente', id); }
  editar(id: string) { console.log('Editar acudiente', id); }
  eliminar(id: string) {
    if (confirm('¿Eliminar acudiente?')) {
      this.data.update(list => list.filter(a => a.id !== id));
    }
  }
}
