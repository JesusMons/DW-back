import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { studentI } from '../models/student.models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students$ = new BehaviorSubject<studentI[]>([
    {
      id: 1,
      name: 'María',
      last_name: 'González',
      document: 10012345,
      guardian: 'Pedro González',
      grade: 5,
      birthdate: new Date('2015-04-10'),
      address: 'Calle 10 #5-20',
      phone: '3001234567',
      guardianPhone: '3109876543',
      email: 'maria.gonzalez@example.com',
      status: 'ACTIVO',
      allergies: ['Maní'],
      emergencyContact: { name: 'Laura Pérez', phone: '3201112233', relationship: 'Tía' },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Juan',
      last_name: 'Martínez',
      document: 10067890,
      guardian: 'Ana Martínez',
      grade: 6,
      birthdate: new Date('2014-08-22'),
      address: 'Carrera 15 #8-50',
      phone: '3015557890',
      guardianPhone: '3154443322',
      email: 'juan.martinez@example.com',
      status: 'INACTIVO',
      allergies: [],
      emergencyContact: { name: 'Carlos Ramírez', phone: '3112223344', relationship: 'Abuelo' },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  studentsObservable = this.students$.asObservable();

  /** Obtener todos los estudiantes */
  getAll(): studentI[] {
    return this.students$.value;
  }

  /** Buscar un estudiante por id */
  getById(id: number): studentI | undefined {
    return this.students$.value.find(s => s.id === id);
  }

  /** Crear nuevo estudiante */
  add(student: studentI) {
    const list = this.students$.value;
    student.id = list.length ? Math.max(...list.map(s => s.id ?? 0)) + 1 : 1;
    student.createdAt = new Date();
    student.updatedAt = new Date();
    this.students$.next([...list, student]);
  }

  /** Editar estudiante existente */
  update(student: studentI) {
    const list = this.students$.value.slice();
    const idx = list.findIndex(s => s.id === student.id);
    if (idx >= 0) {
      student.updatedAt = new Date();
      list[idx] = { ...student };
      this.students$.next(list);
    }
  }

  /** Eliminar estudiante */
  remove(id: number) {
    this.students$.next(this.students$.value.filter(s => s.id !== id));
  }
}
