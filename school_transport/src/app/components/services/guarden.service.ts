import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { guardianI } from '../models/guardian.models'; 

@Injectable({
  providedIn: 'root'
})
export class GuardianService {
  private guardians$ = new BehaviorSubject<guardianI[]>([
    {
      id: 1,
      firstName: 'Carlos',
      lastName: 'Pérez',
      document: 123456789,
      phone: '3001234567',
      email: 'carlos.perez@example.com',
      relationship: 'Padre',
      address: 'Calle 123 #45-67',
      students: [1],
      status: 'ACTIVO',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      firstName: 'Ana',
      lastName: 'García',
      document: 987654321,
      phone: '3107654321',
      email: 'ana.garcia@example.com',
      relationship: 'Madre',
      address: 'Carrera 10 #20-30',
      students: [2, 3],
      status: 'INACTIVO',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  guardiansObservable = this.guardians$.asObservable();

  /** Obtener todos los acudientes */
  getAll(): guardianI[] {
    return this.guardians$.value;
  }

  /** Buscar un acudiente por id */
  getById(id: number): guardianI | undefined {
    return this.guardians$.value.find(g => g.id === id);
  }

  /** Crear nuevo acudiente */
  add(guardian: guardianI) {
    const list = this.guardians$.value;
    guardian.id = list.length ? Math.max(...list.map(g => g.id ?? 0)) + 1 : 1;
    guardian.createdAt = new Date();
    guardian.updatedAt = new Date();
    this.guardians$.next([...list, guardian]);
  }

  /** Editar acudiente existente */
  update(guardian: guardianI) {
    const list = this.guardians$.value.slice();
    const idx = list.findIndex(g => g.id === guardian.id);
    if (idx >= 0) {
      guardian.updatedAt = new Date();
      list[idx] = { ...guardian };
      this.guardians$.next(list);
    }
  }

  /** Eliminar acudiente */
  remove(id: number) {
    this.guardians$.next(this.guardians$.value.filter(g => g.id !== id));
  }
}
