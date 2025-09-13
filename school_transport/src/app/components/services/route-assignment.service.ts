import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { route_assignment } from '../models/route-assignment.models'; // ← ajusta la ruta

@Injectable({ providedIn: 'root' })
export class RouteAssignmentService {
  private store = new BehaviorSubject<route_assignment[]>([
    {
      id: 1,
      routeId: 1,
      busId: 101,
      driverId: 1,
      startDate: new Date('2025-09-01'),
      endDate: undefined,
      status: 'ACTIVO',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      routeId: 2,
      busId: 202,
      driverId: 2,
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-09-01'),
      status: 'INACTIVO',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  assignments$ = this.store.asObservable();

  /** ======== CRUD básico ======== */
  getAll(): route_assignment[] {
    return this.store.value;
  }

  getById(id: number): route_assignment | undefined {
    return this.store.value.find(a => a.id === id);
  }

  add(a: route_assignment): route_assignment {
    const list = this.store.value;
    const nextId = list.length ? Math.max(...list.map(x => x.id ?? 0)) + 1 : 1;
    const now = new Date();
    const payload: route_assignment = {
      ...a,
      id: nextId,
      createdAt: now,
      updatedAt: now,
    };
    this.store.next([...list, payload]);
    return payload;
  }

  update(a: route_assignment): void {
    const list = [...this.store.value];
    const idx = list.findIndex(x => x.id === a.id);
    if (idx < 0) return;
    list[idx] = { ...list[idx], ...a, updatedAt: new Date() };
    this.store.next(list);
  }

  remove(id: number): void {
    this.store.next(this.store.value.filter(x => x.id !== id));
  }

  /** ======== Utilidades de consulta ======== */

  /** Asignaciones (de cualquier estado) por ruta */
  getByRoute(routeId: number): route_assignment[] {
    return this.store.value.filter(a => a.routeId === routeId);
  }

  /** Asignaciones (de cualquier estado) por bus */
  getByBus(busId: number): route_assignment[] {
    return this.store.value.filter(a => a.busId === busId);
  }

  /** Activas a fecha dada (default: hoy) */
  getActiveOn(date: Date = new Date()): route_assignment[] {
    const d = this.onlyDate(date);
    return this.store.value.filter(a =>
      a.status === 'ACTIVO' &&
      this.onlyDate(a.startDate) <= d &&
      (!a.endDate || this.onlyDate(a.endDate) >= d)
    );
  }

  /** Activa para una ruta en una fecha (si existe) */
  getActiveForRoute(routeId: number, date: Date = new Date()): route_assignment | undefined {
    return this.getActiveOn(date).find(a => a.routeId === routeId);
  }

  /** Activa para un bus en una fecha (si existe) */
  getActiveForBus(busId: number, date: Date = new Date()): route_assignment | undefined {
    return this.getActiveOn(date).find(a => a.busId === busId);
  }

  /** ======== Helpers de negocio (simples) ======== */

  /**
   * Activa una nueva asignación para una ruta.
   * - Marca como INACTIVO la asignación ACTIVA previa de esa ruta (si existe), seteando endDate = startDateNueva - 1 día.
   * - Inserta la nueva asignación como ACTIVO (endDate opcional).
   */
  activateForRoute(payload: Omit<route_assignment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): route_assignment {
    const start = this.onlyDate(payload.startDate);
    const prev = this.getActiveForRoute(payload.routeId, start);
    if (prev) {
      const endPrev = new Date(start);
      endPrev.setDate(endPrev.getDate() - 1);
      this.update({ ...prev, status: 'INACTIVO', endDate: endPrev });
    }
    return this.add({ ...payload, status: 'ACTIVO' });
  }

  /**
   * Desactiva una asignación activa (por id).
   * - Cambia status a INACTIVO y setea endDate si no tiene.
   */
  deactivate(id: number, endDate: Date = new Date()): void {
    const a = this.getById(id);
    if (!a) return;
    this.update({
      ...a,
      status: 'INACTIVO',
      endDate: a.endDate ?? endDate,
    });
  }

  /** Normaliza a yyyy-MM-dd (ignora hora) */
  private onlyDate(dt: Date): Date {
    const d = new Date(dt);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}
