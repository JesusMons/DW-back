import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { incidenceI } from '../models/incidence.models'; 

@Injectable({
  providedIn: 'root'
})
export class IncidenceService {
  private store = new BehaviorSubject<incidenceI[]>([
    {
      id: 1,
      busId: 1,
      routeId: 2,
      description: 'El bus tuvo una avería en la ruta sur',
      severity: 'ALTA',
      status: 'EN PROGRESO',
      reportedAt: new Date('2025-09-10T08:30:00'),
      reportedBy: 'Carlos Gómez',
      actionsTaken: 'Se envió un mecánico al lugar',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      busId: 2,
      routeId: 1,
      description: 'Retraso por tráfico pesado en la avenida',
      severity: 'MEDIA',
      status: 'RESUELTO',
      reportedAt: new Date('2025-09-09T14:15:00'),
      resolvedAt: new Date('2025-09-09T15:00:00'),
      reportedBy: 'María López',
      actionsTaken: 'Ruta alterna utilizada',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  incidences$ = this.store.asObservable();

  /** Obtener todas */
  getAll(): incidenceI[] {
    return this.store.value;
  }

  /** Buscar por id */
  getById(id: number): incidenceI | undefined {
    return this.store.value.find(i => i.id === id);
  }

  /** Crear */
  add(inc: incidenceI) {
    const list = this.store.value;
    const nextId = list.length ? Math.max(...list.map(i => i.id ?? 0)) + 1 : 1;
    const now = new Date();
    const payload: incidenceI = {
      ...inc,
      id: nextId,
      createdAt: now,
      updatedAt: now
    };
    this.store.next([...list, payload]);
  }

  /** Actualizar */
  update(inc: incidenceI) {
    const list = [...this.store.value];
    const idx = list.findIndex(i => i.id === inc.id);
    if (idx < 0) return;
    list[idx] = { ...list[idx], ...inc, updatedAt: new Date() };
    this.store.next(list);
  }

  /** Eliminar */
  remove(id: number) {
    this.store.next(this.store.value.filter(i => i.id !== id));
  }

  /** Cambiar estado */
  setStatus(id: number, status: incidenceI['status']) {
    const inc = this.getById(id);
    if (!inc) return;
    this.update({ ...inc, status });
  }

  /** Resolver incidencia */
  resolve(id: number, actionsTaken: string) {
    const inc = this.getById(id);
    if (!inc) return;
    this.update({
      ...inc,
      status: 'RESUELTO',
      actionsTaken,
      resolvedAt: new Date()
    });
  }
}
