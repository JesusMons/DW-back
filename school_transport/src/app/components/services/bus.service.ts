import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { busI } from '../models/bus.models'; // 👈 importa tu modelo real desde /models

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private buses$ = new BehaviorSubject<busI[]>([
    {
      id: 1,
      plate: 'ABC-123',
      capacity: 40,
      mileage: 120000,
      model: 'Sprinter',
      brand: 'Mercedes-Benz',
      year: 2018,
      color: 'Blanco',
      status: 'ACTIVO',
      insuranceExpiry: new Date('2025-12-31'),
      lastMaintenance: new Date('2025-07-01'),
      nextMaintenance: new Date('2025-10-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      plate: 'XYZ-789',
      capacity: 30,
      mileage: 80000,
      model: 'Coaster',
      brand: 'Toyota',
      year: 2020,
      color: 'Azul',
      status: 'EN MANTENIMIENTO',
      insuranceExpiry: new Date('2025-11-15'),
      lastMaintenance: new Date('2025-08-15'),
      nextMaintenance: new Date('2025-09-15'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  busesObservable = this.buses$.asObservable();

  /** Obtener todos los buses */
  getAll(): busI[] {
    return this.buses$.value;
  }

  /** Buscar un bus por id */
  getById(id: number): busI | undefined {
    return this.buses$.value.find(b => b.id === id);
  }

  /** Crear un nuevo bus */
  add(bus: busI) {
    const list = this.buses$.value;
    bus.id = list.length ? Math.max(...list.map(b => b.id ?? 0)) + 1 : 1;
    bus.createdAt = new Date();
    bus.updatedAt = new Date();
    this.buses$.next([...list, bus]);
  }

  /** Editar un bus */
  update(bus: busI) {
    const list = [...this.buses$.value];
    const idx = list.findIndex(b => b.id === bus.id);
    if (idx >= 0) {
      bus.updatedAt = new Date();
      list[idx] = { ...bus };
      this.buses$.next(list);
    }
  }

  /** Eliminar un bus */
  remove(id: number) {
    this.buses$.next(this.buses$.value.filter(b => b.id !== id));
  }
}
