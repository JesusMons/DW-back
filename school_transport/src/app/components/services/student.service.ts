import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { StudentI, StudentStatus } from '../models/student.models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl = '/api/students';
  private readonly store = new BehaviorSubject<StudentI[]>([]);
  private loaded = false;

  readonly students$ = this.store.asObservable();

  constructor(private readonly http: HttpClient) {}

  private normalize(raw: any): StudentI {
    if (!raw) return raw;
    const normalizeDate = (value?: string | Date | null): Date | null => {
      if (!value) return null;
      return value instanceof Date ? value : new Date(value);
    };

    return {
      id: raw?.id ?? raw?.ID,
      name: raw?.name ?? '',
      lastName: raw?.lastName ?? raw?.last_name ?? '',
      document: String(raw?.document ?? ''),
      guardianId: raw?.guardianId ?? raw?.guardian_id ?? null,
      grade: raw?.grade ?? null,
      birthdate: normalizeDate(raw?.birthdate ?? raw?.birth_date),
      address: raw?.address ?? null,
      phone: raw?.phone ?? null,
      guardianPhone: raw?.guardianPhone ?? raw?.guardian_phone ?? null,
      email: raw?.email ?? null,
      status: (raw?.status as StudentStatus | undefined) ?? 'ACTIVO',
      allergies: raw?.allergies ?? null,
      emergencyContact: raw?.emergencyContact ?? raw?.emergency_contact ?? null,
      createdAt: normalizeDate(raw?.createdAt ?? raw?.created_at) ?? undefined,
      updatedAt: normalizeDate(raw?.updatedAt ?? raw?.updated_at) ?? undefined
    };
  }

  private normalizeList(resp: any): StudentI[] {
    const list =
      resp?.students ??
      (Array.isArray(resp?.data) ? resp.data : resp?.data?.students) ??
      resp ??
      [];
    return Array.isArray(list) ? list.map(item => this.normalize(item)) : [];
  }

  private replace(student: StudentI): void {
    const list = this.store.value;
    const idx = list.findIndex(s => s.id === student.id);
    if (idx === -1) {
      this.store.next([...list, student]);
    } else {
      const clone = [...list];
      clone[idx] = student;
      this.store.next(clone);
    }
  }

  loadAll(force = false): void {
    if (this.loaded && !force) return;
    this.fetchAll().subscribe({
      error: err => console.error('Error cargando estudiantes', err)
    });
  }

  fetchAll(): Observable<StudentI[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(resp => this.normalizeList(resp)),
      tap(list => {
        this.store.next(list);
        this.loaded = true;
      })
    );
  }

  getSnapshot(): StudentI[] {
    return this.store.value;
  }

  getById(id: number): Observable<StudentI> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(map(resp => this.normalize(resp)));
  }

  create(payload: StudentI): Observable<StudentI> {
    return this.http.post<any>(this.baseUrl, payload).pipe(
      map(resp => this.normalize(resp)),
      tap(student => this.store.next([...this.store.value, student]))
    );
  }

  update(id: number, payload: StudentI): Observable<StudentI> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload).pipe(
      map(resp => this.normalize(resp)),
      tap(student => this.replace(student))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.store.next(this.store.value.filter(s => s.id !== id)))
    );
  }

  deactivate(id: number): Observable<StudentI> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/deactivate`, {}).pipe(
      switchMap(() => this.getById(id)),
      tap(student => this.replace(student))
    );
  }
}
