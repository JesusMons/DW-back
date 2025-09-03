import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Ruta { id: string; nombre: string; }
export interface Itinerario { id: string; rutaId: string; fecha: string; hora: string; }
export interface Estudiante { id: string; nombre: string; grado: string; }
export interface Inscripcion {
  id: string;               // id de la inscripción
  rutaId: string;
  itinerarioId: string;
  estudianteId: string;
  fechaRegistro: string;    // YYYY-MM-DD
  observaciones?: string;
}

@Component({
  selector: 'app-mostrar-inscritos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mostrar-inscritos.html',
  styleUrls: ['./mostrar-inscritos.css']
})
export class MostrarInscritos {
  // Mock de catálogos
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

  // Mock de inscripciones
  private data = signal<Inscripcion[]>([
    { id: 'INS-001', rutaId: 'R-001', itinerarioId: 'IT-101', estudianteId: 'ST-001', fechaRegistro: '2025-09-10', observaciones: 'Silla delantera' },
    { id: 'INS-002', rutaId: 'R-002', itinerarioId: 'IT-201', estudianteId: 'ST-002', fechaRegistro: '2025-09-11' },
    { id: 'INS-003', rutaId: 'R-001', itinerarioId: 'IT-102', estudianteId: 'ST-003', fechaRegistro: '2025-09-12' },
  ]);

  // Filtros
  filtroRuta = signal<string>('');
  filtroItinerario = signal<string>('');
  query = signal<string>('');

  // Derivados
  itinerariosFiltrados = computed(() =>
    this.filtroRuta()
      ? this.itinerarios.filter(i => i.rutaId === this.filtroRuta())
      : this.itinerarios
  );

  inscritos = computed(() => {
    const q = this.query().toLowerCase().trim();
    const ruta = this.filtroRuta();
    const iti  = this.filtroItinerario();

    return this.data().filter(ins => {
      const pasaRuta = !ruta || ins.rutaId === ruta;
      const pasaIti  = !iti  || ins.itinerarioId === iti;

      if (!pasaRuta || !pasaIti) return false;

      if (!q) return true;

      const est = this.estudiantes.find(e => e.id === ins.estudianteId);
      const r   = this.rutas.find(r => r.id === ins.rutaId);
      const it  = this.itinerarios.find(i => i.id === ins.itinerarioId);

      const texto = `${ins.id} ${ins.fechaRegistro} ${ins.observaciones ?? ''} ` +
                    `${est?.id} ${est?.nombre} ${est?.grado} ` +
                    `${r?.id} ${r?.nombre} ` +
                    `${it?.id} ${it?.fecha} ${it?.hora}`.toLowerCase();

      return texto.includes(q);
    });
  });

  // Helpers para mostrar nombres en la tabla
  nombreRuta = (id: string) => this.rutas.find(r => r.id === id)?.nombre ?? id;
  descItinerario = (id: string) => {
    const it = this.itinerarios.find(i => i.id === id);
    return it ? `${it.fecha} ${it.hora}` : id;
  };
  nombreEstudiante = (id: string) => {
    const e = this.estudiantes.find(x => x.id === id);
    return e ? `${e.nombre} (${e.grado})` : id;
  };

  // Acciones mock
  ver(id: string)    { /* navegar si quieres */ console.log('Ver inscripción', id); }
  editar(id: string) { console.log('Editar inscripción', id); }
  eliminar(id: string) {
    if (confirm('¿Eliminar inscripción?')) {
      this.data.update(list => list.filter(x => x.id !== id));
    }
  }

  onRutaChange() {
    // al cambiar ruta, limpiar itinerario si ya no corresponde
    if (this.filtroItinerario() &&
        !this.itinerariosFiltrados().some(i => i.id === this.filtroItinerario())) {
      this.filtroItinerario.set('');
    }
  }
}
