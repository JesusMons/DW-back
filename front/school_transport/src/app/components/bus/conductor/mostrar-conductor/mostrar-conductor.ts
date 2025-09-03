import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Conductor {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  licencia: string;     // categoría (A2, C1, C2…)
  venceLicencia: string; // YYYY-MM-DD
  estado: 'ACTIVO' | 'INACTIVO';
}

@Component({
  selector: 'app-mostrar-conductor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mostrar-conductor.html',
  styleUrls: ['./mostrar-conductor.css']
})
export class MostrarConductor {
  // Mock de datos
  private data = signal<Conductor[]>([
    { id: 'CD-001', nombre: 'Pedro López',  documento: '80012345', telefono: '3001112233', licencia: 'C2', venceLicencia: '2026-03-15', estado: 'ACTIVO' },
    { id: 'CD-002', nombre: 'Marta Ruiz',   documento: '80023456', telefono: '3012223344', licencia: 'C1', venceLicencia: '2025-12-01', estado: 'ACTIVO' },
    { id: 'CD-003', nombre: 'Jhon Ortiz',   documento: '80034567', telefono: '3023334455', licencia: 'A2', venceLicencia: '2025-10-20', estado: 'INACTIVO' },
  ]);

  // Buscador
  query = signal<string>('');
  conductores = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.data();
    return this.data().filter(c => (
      `${c.id} ${c.nombre} ${c.documento} ${c.telefono} ${c.licencia} ${c.venceLicencia} ${c.estado}`
    ).toLowerCase().includes(q));
  });

  // Acciones mock
  ver(id: string)    { /* this.router.navigate(['/conductores/detalle', id]) */ console.log('Ver', id); }
  editar(id: string) { /* this.router.navigate(['/conductores/editar', id])  */ console.log('Editar', id); }
  eliminar(id: string) {
    if (confirm('¿Eliminar conductor?')) {
      this.data.update(list => list.filter(c => c.id !== id));
    }
  }
}
