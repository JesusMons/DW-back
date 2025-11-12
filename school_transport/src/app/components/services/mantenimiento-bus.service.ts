import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { maintenanceI } from '../models/mantenimientoBus.models'; 

@Injectable({
  providedIn: 'root'
})
export class MantenimientoBusService {
  // Estado inicial simulado
  private store = new BehaviorSubject<maintenanceI[]>([
    {
      id: 1,
      busId: 101,
      type: "PREVENTIVO",
      description: "Cambio de aceite y revisión general",
      cost: 200000,
      performedAt: new Date("2025-08-15"),
      nextDueDate: new Date("2025-12-15"),
      status: "COMPLETADO",
      mechanic: "Taller Los Mecánicos",
      odometer: 35000,
      createdAt: new Date("2025-08-15"),
      updatedAt: new Date("2025-08-15")
    },
    {
      id: 2,
      busId: 202,
      type: "CORRECTIVO",
      description: "Reparación de frenos",
      cost: 500000,
      performedAt: new Date("2025-09-01"),
      status: "EN PROGRESO",
      mechanic: "Mecánica Rápida",
      odometer: 48000,
      createdAt: new Date("2025-09-01"),
      updatedAt: new Date("2025-09-05")
    }
  ]);

  maintenance$ = this.store.asObservable();

  /** Obtener todos los mantenimientos */
  getAll(): maintenanceI[] {
    return this.store.value;
  }

  /** Obtener por id */
  getById(id: number): maintenanceI | undefined {
    return this.store.value.find(m => m.id === id);
  }

  /** Obtener por bus */
  getByBus(busId: number): maintenanceI[] {
    return this.store.value.filter(m => m.busId === busId);
  }

  /** Agregar mantenimiento */
  add(record: maintenanceI) {
    const list = [...this.store.value];
    const nextId = list.length ? Math.max(...list.map(m => m.id ?? 0)) + 1 : 1;
    const now = new Date();

    const payload: maintenanceI = {
      ...record,
      id: nextId,
      createdAt: now,
      updatedAt: now
    };

    this.store.next([...list, payload]);
  }

  /** Actualizar mantenimiento */
  update(record: maintenanceI) {
    const list = [...this.store.value];
    const idx = list.findIndex(m => m.id === record.id);
    if (idx < 0) return;

    list[idx] = { ...list[idx], ...record, updatedAt: new Date() };
    this.store.next(list);
  }

  /** Eliminar mantenimiento */
  remove(id: number) {
    this.store.next(this.store.value.filter(m => m.id !== id));
  }

  /** Cambiar estado */
  setStatus(id: number, status: maintenanceI['status']) {
    const record = this.getById(id);
    if (!record) return;
    this.update({ ...record, status });
  }
}
