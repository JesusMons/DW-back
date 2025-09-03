import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Estudiante {
  id: string;
  nombre: string;
  documento: string;
  grado: string;
  acudiente: string;
  telefono: string;
  estado: 'ACTIVO' | 'INACTIVO';
}

@Component({
  selector: 'app-mostrar-estudi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mostrar-estudi.html',
  styleUrls: ['./mostrar-estudi.css']
})
export class MostrarEstudi {
  // Mock de datos (simulación)
  private data = signal<Estudiante[]>([
    { id: 'ST-001', nombre: 'Laura Pérez',  documento: '1001234567', grado: '6°A', acudiente: 'Ana Pérez',   telefono: '3001234567', estado: 'ACTIVO' },
    { id: 'ST-002', nombre: 'Carlos Gómez', documento: '1002345678', grado: '7°B', acudiente: 'Luis Gómez',  telefono: '3012345678', estado: 'ACTIVO' },
    { id: 'ST-003', nombre: 'María Rivas',  documento: '1003456789', grado: '8°A', acudiente: 'Julia Rivas', telefono: '3023456789', estado: 'INACTIVO' },
    { id: 'ST-004', nombre: 'Jorge Díaz',   documento: '1004567890', grado: '9°C', acudiente: 'Pedro Díaz',  telefono: '3034567890', estado: 'ACTIVO' },
  ]);

  // Buscador
  query = signal<string>('');
  estudiantes = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.data();
    return this.data().filter(e => (
      `${e.id} ${e.nombre} ${e.documento} ${e.grado} ${e.acudiente} ${e.telefono}`
    ).toLowerCase().includes(q));
  });

  // Acciones mock
  ver(id: string)   { console.log('Ver estudiante', id); }
  editar(id: string){ /* futuro: router.navigate */ console.log('Editar', id); }
  eliminar(id: string) {
    if (confirm('¿Eliminar estudiante?')) {
      this.data.update(list => list.filter(e => e.id !== id));
    }
  }
}
