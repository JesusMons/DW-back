import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { assistanceI } from '../models/assistance.models'; // ajusta la ruta del modelo

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  // estado inicial simulado
  private store = new BehaviorSubject<assistanceI[]>([
    {
      id: 1,
      studentId: 101,
      routeId: 1,
      busId: 101,
      date: new Date('2025-09-12'),
      time: '07:30',
      status: 'CONFIRMADO',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      studentId: 102,
      routeId: 2,
      busId: 202,
      date: new Date('2025-09-12'),
      time: '07:40',
      status: 'AUSENTE',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  assistance$ = this.store.asObservable();

  /** Obtener todas */
  getAll(): assistanceI[] {
    return this.store.value;
  }

  /** Buscar por id */
  getById(id: number): assistanceI | undefined {
    return this.store.value.find(a => a.id === id);
  }

  /** Filtrar por estudiante */
  getByStudent(studentId: number): assistanceI[] {
    return this.store.value.filter(a => a.studentId === studentId);
  }

  /** Filtrar por ruta y fecha */
  getByRouteAndDate(routeId: number, date: Date): assistanceI[] {
    const day = date.toDateString();
    return this.store.value.filter(a => a.routeId === routeId && a.date.toDateString() === day);
  }

  /** Crear */
  add(asst: assistanceI) {
    const list = this.store.value;
    const nextId = list.length ? Math.max(...list.map(a => a.id ?? 0)) + 1 : 1;
    const now = new Date();

    const payload: assistanceI = {
      ...asst,
      id: nextId,
      createdAt: now,
      updatedAt: now
    };

    this.store.next([...list, payload]);
  }

  /** Actualizar */
  update(asst: assistanceI) {
    const list = [...this.store.value];
    const idx = list.findIndex(a => a.id === asst.id);
    if (idx < 0) return;

    list[idx] = { ...list[idx], ...asst, updatedAt: new Date() };
    this.store.next(list);
  }

  /** Eliminar */
  remove(id: number) {
    this.store.next(this.store.value.filter(a => a.id !== id));
  }

  /** Cambiar estado rápidamente */
  setStatus(id: number, status: assistanceI['status']) {
    const a = this.getById(id);
    if (!a) return;
    this.update({ ...a, status });
  }
}
