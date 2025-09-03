import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

type RutaEstado = 'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO';

export interface Ruta {
  id: string;
  nombre: string;
  origen: string;
  destino: string;
  horaSalida: string;
  bus: string;
  conductor: string;
  cupos: number;
  estado: RutaEstado;
}

@Component({
  selector: 'app-mostrar-rut',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mostrar-rut.html',
  styleUrls: ['./mostrar-rut.css']
})
export class MostrarRut {
  query = signal<string>('');

  private readonly dataSource = signal<Ruta[]>([
    { id: 'R-001', nombre: 'Mañana Norte', origen: 'Barrio El Prado', destino: 'Colegio Central', horaSalida: '06:30', bus: 'BUS-12', conductor: 'Carlos Pérez', cupos: 28, estado: 'ACTIVA' },
    { id: 'R-002', nombre: 'Tarde Sur', origen: 'Colegio Central', destino: 'Barrio San José', horaSalida: '15:10', bus: 'BUS-08', conductor: 'María Gómez', cupos: 30, estado: 'ACTIVA' },
    { id: 'R-003', nombre: 'Mañana Oeste', origen: 'Barrio Las Palmas', destino: 'Colegio Central', horaSalida: '06:50', bus: 'BUS-03', conductor: 'Jorge Rivas', cupos: 26, estado: 'MANTENIMIENTO' },
    { id: 'R-004', nombre: 'Nocturna Centro', origen: 'Colegio Central', destino: 'Centro', horaSalida: '19:00', bus: 'BUS-21', conductor: 'Ana Castillo', cupos: 25, estado: 'INACTIVA' }
  ]);

  rutasFiltradas = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.dataSource();
    return this.dataSource().filter(r =>
      (r.id + ' ' + r.nombre + ' ' + r.origen + ' ' + r.destino + ' ' + r.bus + ' ' + r.conductor)
        .toLowerCase()
        .includes(q)
    );
  });
}
