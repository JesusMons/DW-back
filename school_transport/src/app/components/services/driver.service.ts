import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { driverI } from '../models/driver.models'; // ⚠️ ajusta la ruta de tu modelo

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private store = new BehaviorSubject<driverI[]>([
    {
      id: 1,
      name: 'Carlos Gómez',
      document: 12345678,
      phone: '3001234567',
      email: 'carlos.gomez@example.com',
      address: 'Cra 10 #20-30',
      type_licence: 'C2',
      licenceExpiry: new Date('2027-05-20'),
      experienceYears: 5,
      status: 'ACTIVO',
      assignedBusId: 1,
      photoUrl: '/drivers/carlos_gomez.webp',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'María López',
      document: 87654321,
      phone: '3109876543',
      email: 'maria.lopez@example.com',
      address: 'Cll 45 #12-15',
      type_licence: 'C3',
      licenceExpiry: new Date('2026-11-15'),
      experienceYears: 8,
      status: 'INACTIVO',
      assignedBusId: 2,
      photoUrl: '/drivers/maria_lopez.webp',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  drivers$ = this.store.asObservable();

  /** Obtener todos */
  getAll(): driverI[] {
    return this.store.value;
  }

  /** Buscar por id */
  getById(id: number): driverI | undefined {
    return this.store.value.find(d => d.id === id);
  }

  /** Crear nuevo */
  add(driver: driverI) {
    const list = this.store.value;
    const nextId = list.length ? Math.max(...list.map(d => d.id ?? 0)) + 1 : 1;
    const now = new Date();

    const payload: driverI = {
      ...driver,
      id: nextId,
      createdAt: now,
      updatedAt: now,
      photoUrl: driver.photoUrl || '/drivers/default.jpg' // 👈 default si no sube foto
    };

    this.store.next([...list, payload]);
  }

  /** Actualizar */
  update(driver: driverI) {
    const list = [...this.store.value];
    const idx = list.findIndex(d => d.id === driver.id);
    if (idx < 0) return;

    list[idx] = { ...list[idx], ...driver, updatedAt: new Date() };
    this.store.next(list);
  }

  /** Eliminar */
  remove(id: number) {
    this.store.next(this.store.value.filter(d => d.id !== id));
  }

  /** Cambiar estado */
  setStatus(id: number, status: driverI['status']) {
    const d = this.getById(id);
    if (!d) return;
    this.update({ ...d, status });
  }
}
