// src/app/services/stop.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { stopI } from '../models/stop.models'; // 👈 importa tu modelo real

@Injectable({ providedIn: 'root' })
export class StopService {
  private store = new BehaviorSubject<stopI[]>([
    {
      id: 1,
      name: 'Parque Central',
      direction: 'Calle 10 #5-20',
      order: 1,
      landmark: 'Frente a la estatua',
      status: 'ACTIVA',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Av. Bolívar',
      direction: 'Av. Bolívar con 12',
      order: 2,
      landmark: 'Esquina farmacia',
      status: 'ACTIVA',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'Colegio Nacional',
      direction: 'Cra 7 #45-12',
      order: 3,
      status: 'INACTIVA',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  stops$ = this.store.asObservable();

  /** Leer todo */
  getAll(): stopI[] {
    // devolver ordenado por 'order' si existe
    return [...this.store.value].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  /** Leer por id */
  getById(id: number): stopI | undefined {
    return this.store.value.find(s => s.id === id);
  }

  /** Crear */
  add(stop: stopI) {
    const list = this.store.value;
    const nextId = list.length ? Math.max(...list.map(s => s.id ?? 0)) + 1 : 1;
    const now = new Date();
    const payload: stopI = {
      ...stop,
      id: nextId,
      createdAt: now,
      updatedAt: now,
      // si no tiene order, lo ponemos al final
      order: stop.order ?? (list.length ? Math.max(...list.map(s => s.order ?? 0)) + 1 : 1)
    };
    this.store.next([...list, payload]);
  }

  /** Actualizar */
  update(stop: stopI) {
    const list = [...this.store.value];
    const idx = list.findIndex(s => s.id === stop.id);
    if (idx < 0) return;
    list[idx] = { ...list[idx], ...stop, updatedAt: new Date() };
    this.store.next(list);
  }

  /** Eliminar */
  remove(id: number) {
    this.store.next(this.store.value.filter(s => s.id !== id));
  }

  /** Reordenar paradas (simple swap/replace de órdenes) */
  reorder(idsInOrder: number[]) {
    const mapOrder = new Map<number, number>();
    idsInOrder.forEach((id, i) => mapOrder.set(id, i + 1));
    const updated = this.store.value.map(s =>
      mapOrder.has(s.id!) ? { ...s, order: mapOrder.get(s.id!)!, updatedAt: new Date() } : s
    );
    this.store.next(updated);
  }

  /** Activar / Inactivar rápidamente */
  setStatus(id: number, status: stopI['status']) {
    const s = this.getById(id);
    if (!s) return;
    this.update({ ...s, status });
  }
}
