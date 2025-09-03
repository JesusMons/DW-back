import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

type Severidad = 'BAJA' | 'MEDIA' | 'ALTA';
type Estado = 'ABIERTA' | 'EN PROCESO' | 'CERRADA';

export interface Incidencia {
  id: string;
  fecha: string;         // YYYY-MM-DD
  hora: string;          // HH:mm
  rutaId: string;        // opcional si manejas rutas
  busPlaca: string;
  conductorId: string;
  conductorNombre: string;
  severidad: Severidad;
  estado: Estado;
  descripcion: string;   // narración de lo ocurrido
}

@Component({
  selector: 'app-mostrar-incidencia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mostrar-incidencia.html',
  styleUrls: ['./mostrar-incidencia.css']
})
export class MostrarIncidencia {
  // Mock de incidencias
  private data = signal<Incidencia[]>([
    {
      id: 'INC-001',
      fecha: '2025-09-10',
      hora: '06:45',
      rutaId: 'R-001',
      busPlaca: 'ABC-123',
      conductorId: 'CD-001',
      conductorNombre: 'Pedro López',
      severidad: 'MEDIA',
      estado: 'EN PROCESO',
      descripcion: 'Retraso de 15 minutos por trancón en la Av. 10. Se notificó a acudientes.'
    },
    {
      id: 'INC-002',
      fecha: '2025-09-11',
      hora: '15:20',
      rutaId: 'R-002',
      busPlaca: 'XYZ-987',
      conductorId: 'CD-002',
      conductorNombre: 'Marta Ruiz',
      severidad: 'BAJA',
      estado: 'CERRADA',
      descripcion: 'Falla menor en puerta trasera, solucionada en patio. No hubo afectación al servicio.'
    },
    {
      id: 'INC-003',
      fecha: '2025-09-12',
      hora: '06:35',
      rutaId: 'R-003',
      busPlaca: 'JKL-456',
      conductorId: 'CD-003',
      conductorNombre: 'Jhon Ortiz',
      severidad: 'ALTA',
      estado: 'ABIERTA',
      descripcion: 'Estudiante con malestar. Se activó protocolo, se avisó al acudiente y coordinación.'
    }
  ]);

  // Filtros
  q = signal<string>('');                 // texto libre
  filtroSeveridad = signal<Severidad | ''>('');
  filtroEstado = signal<Estado | ''>('');
  filtroPlaca = signal<string>('');       // por bus
  filtroConductor = signal<string>('');   // por conductor

  // Selección actual (detalle)
  seleccion = signal<Incidencia | null>(null);

  // Lista filtrada
  incidencias = computed(() => {
    const q = this.q().toLowerCase().trim();
    const sev = this.filtroSeveridad();
    const est = this.filtroEstado();
    const placa = this.filtroPlaca().toLowerCase().trim();
    const cond = this.filtroConductor().toLowerCase().trim();

    return this.data().filter(i => {
      const pasaSev = !sev || i.severidad === sev;
      const pasaEst = !est || i.estado === est;
      const pasaPlaca = !placa || i.busPlaca.toLowerCase().includes(placa);
      const pasaCond = !cond || i.conductorNombre.toLowerCase().includes(cond);

      const texto = `${i.id} ${i.fecha} ${i.hora} ${i.rutaId} ${i.busPlaca} ${i.conductorNombre} ${i.severidad} ${i.estado} ${i.descripcion}`.toLowerCase();
      const pasaQ = !q || texto.includes(q);

      return pasaSev && pasaEst && pasaPlaca && pasaCond && pasaQ;
    });
  });

  // Helpers para badges
  claseSeveridad(sev: Severidad) {
    return {
      BAJA: 'sev-baja',
      MEDIA: 'sev-media',
      ALTA: 'sev-alta'
    }[sev];
  }

  claseEstado(est: Estado) {
    return {
      ABIERTA: 'st-open',
      'EN PROCESO': 'st-progress',
      CERRADA: 'st-closed'
    }[est];
  }

  // Acciones simuladas
  ver(i: Incidencia) { this.seleccion.set(i); }
  limpiarSeleccion() { this.seleccion.set(null); }

  cerrar(i: Incidencia) {
    // Simula cerrar incidencia
    this.data.update(list => list.map(x => x.id === i.id ? { ...x, estado: 'CERRADA' } : x));
    // refrescar selección si corresponde
    if (this.seleccion()?.id === i.id) {
      this.seleccion.set({ ...i, estado: 'CERRADA' });
    }
  }

  eliminar(i: Incidencia) {
    if (!confirm('¿Eliminar incidencia?')) return;
    this.data.update(list => list.filter(x => x.id !== i.id));
    if (this.seleccion()?.id === i.id) this.seleccion.set(null);
  }
}
