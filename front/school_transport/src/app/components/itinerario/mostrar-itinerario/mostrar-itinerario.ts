import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

type Dia = 'Lun' | 'Mar' | 'Mié' | 'Jue' | 'Vie' | 'Sáb';
export interface Itinerario {
  id: string;           // ID del itinerario
  rutaId: string;       // Relación con la ruta (p.e. R-001)
  rutaNombre: string;   // Nombre legible de la ruta
  orden: number;        // Orden de la parada
  parada: string;       // Nombre de la parada
  hora: string;         // HH:mm
  bus: string;
  conductor: string;
  dias: Dia[];          // Días activos
}

@Component({
  selector: 'app-mostrar-itinerario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mostrar-itinerario.html',
  styleUrls: ['./mostrar-itinerario.css']
})
export class MostrarItinerario {
  // Datos mock (futuro: reemplazar por servicio HTTP)
  private readonly dataSource = signal<Itinerario[]>([
    { id: 'I-1001', rutaId: 'R-001', rutaNombre: 'Mañana Norte', orden: 1, parada: 'El Prado - Parque', hora: '06:10', bus: 'BUS-12', conductor: 'Carlos Pérez', dias: ['Lun','Mar','Mié','Jue','Vie'] },
    { id: 'I-1002', rutaId: 'R-001', rutaNombre: 'Mañana Norte', orden: 2, parada: 'Calle 10 con 15',  hora: '06:20', bus: 'BUS-12', conductor: 'Carlos Pérez', dias: ['Lun','Mar','Mié','Jue','Vie'] },
    { id: 'I-1003', rutaId: 'R-001', rutaNombre: 'Mañana Norte', orden: 3, parada: 'Colegio Central', hora: '06:30', bus: 'BUS-12', conductor: 'Carlos Pérez', dias: ['Lun','Mar','Mié','Jue','Vie'] },

    { id: 'I-2001', rutaId: 'R-002', rutaNombre: 'Tarde Sur', orden: 1, parada: 'Colegio Central', hora: '15:10', bus: 'BUS-08', conductor: 'María Gómez', dias: ['Lun','Mar','Mié','Jue','Vie'] },
    { id: 'I-2002', rutaId: 'R-002', rutaNombre: 'Tarde Sur', orden: 2, parada: 'San José - Plaza', hora: '15:25', bus: 'BUS-08', conductor: 'María Gómez', dias: ['Lun','Mar','Mié','Jue','Vie'] },
    { id: 'I-2003', rutaId: 'R-002', rutaNombre: 'Tarde Sur', orden: 3, parada: 'San José - Terminal', hora: '15:35', bus: 'BUS-08', conductor: 'María Gómez', dias: ['Lun','Mar','Mié','Jue','Vie'] },

    { id: 'I-3001', rutaId: 'R-003', rutaNombre: 'Mañana Oeste', orden: 1, parada: 'Las Palmas', hora: '06:35', bus: 'BUS-03', conductor: 'Jorge Rivas', dias: ['Lun','Mié','Vie'] },
  ]);

  // Filtros
  query = signal<string>('');                 // texto libre
  filtroRuta = signal<string>('');            // rutaId o nombre
  filtroDia = signal<Dia | ''>('');           // día

  // Opciones de filtro (derivadas de los datos)
  rutasDisponibles = computed(() => {
    const set = new Map<string, string>(); // rutaId -> rutaNombre
    this.dataSource().forEach(i => set.set(i.rutaId, i.rutaNombre));
    return Array.from(set.entries()).map(([id, nombre]) => ({ id, nombre }));
  });
  diasDisponibles: (Dia | '')[] = ['Lun','Mar','Mié','Jue','Vie','Sáb'];

  // Lista filtrada
  items = computed(() => {
    const q = this.query().trim().toLowerCase();
    const r = this.filtroRuta();
    const d = this.filtroDia();

    return this.dataSource()
      .filter(it => {
        const texto = `${it.id} ${it.rutaId} ${it.rutaNombre} ${it.parada} ${it.bus} ${it.conductor} ${it.hora}`.toLowerCase();
        const coincideTexto = !q || texto.includes(q);
        const coincideRuta = !r || it.rutaId === r || it.rutaNombre.toLowerCase() === r.toLowerCase();
        const coincideDia = !d || it.dias.includes(d as Dia);
        return coincideTexto && coincideRuta && coincideDia;
      })
      .sort((a,b) => (a.rutaId === b.rutaId) ? a.orden - b.orden : a.rutaId.localeCompare(b.rutaId));
  });

  // Acciones de UI (mock)
  eliminar(it: Itinerario) {
    if (!confirm(`¿Eliminar itinerario ${it.id} (${it.rutaNombre} - ${it.parada})?`)) return;
    this.dataSource.update(arr => arr.filter(x => x.id !== it.id));
  }
}
