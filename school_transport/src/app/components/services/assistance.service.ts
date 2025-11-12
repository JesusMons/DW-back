import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { AssistanceI, AssistanceStatus } from '../models/assistance.models';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  private readonly baseUrl = '/api/assistances';

  constructor(private readonly http: HttpClient) {}

  private fromResponseItem(resp: any): any {
    if (!resp) {
      return resp;
    }

    if (resp.assistance) {
      return resp.assistance;
    }

    if (resp.data) {
      if (Array.isArray(resp.data)) {
        return resp.data[0];
      }
      if (resp.data.assistance) {
        return resp.data.assistance;
      }
      return resp.data;
    }

    return resp;
  }

  private normalize(dto: any): AssistanceI {
    const item = this.fromResponseItem(dto) ?? {};
    const normalizeDate = (value?: string | Date | null): Date | undefined => {
      if (!value) return undefined;
      return value instanceof Date ? value : new Date(value);
    };

    return {
      id: item?.id ?? item?.ID,
      studentId: item?.studentId ?? item?.student_id,
      routeId: item?.routeId ?? item?.route_id,
      busId: item?.busId ?? item?.bus_id,
      date: normalizeDate(item?.date) ?? new Date(),
      time: item?.time ?? '',
      status: item?.status as AssistanceStatus | undefined,
      createdAt: normalizeDate(item?.createdAt) ?? normalizeDate(item?.created_at),
      updatedAt: normalizeDate(item?.updatedAt) ?? normalizeDate(item?.updated_at)
    };
  }

  private normalizeList(resp: any): AssistanceI[] {
    if (!resp) {
      return [];
    }

    if (Array.isArray(resp)) {
      return resp.map(item => this.normalize(item));
    }

    const listCandidate =
      resp?.assistances ??
      (Array.isArray(resp?.data) ? resp?.data : resp?.data?.assistances) ??
      [];

    if (!Array.isArray(listCandidate)) {
      return [];
    }

    return listCandidate.map((item: any) => this.normalize(item));
  }

  /** Obtener todas las asistencias */
  getAll(): Observable<AssistanceI[]> {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(map(resp => this.normalizeList(resp)));
  }

  /** Buscar por id */
  getById(id: number): Observable<AssistanceI> {
    return this.http
      .get<any>(`${this.baseUrl}/${id}`)
      .pipe(map(resp => this.normalize(resp)));
  }

  /** Crear */
  create(payload: AssistanceI): Observable<AssistanceI> {
    return this.http
      .post<any>(this.baseUrl, payload)
      .pipe(map(resp => this.normalize(resp)));
  }

  /** Actualizar */
  update(id: number, payload: AssistanceI): Observable<AssistanceI> {
    return this.http
      .put<any>(`${this.baseUrl}/${id}`, payload)
      .pipe(map(resp => this.normalize(resp)));
  }

  /** Eliminar físicamente */
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /** Eliminación lógica */
  deactivate(id: number): Observable<AssistanceI> {
    return this.http
      .patch<void>(`${this.baseUrl}/${id}/deactivate`, {})
      .pipe(switchMap(() => this.getById(id)));
  }

  /** Cambiar estado rápidamente */
  setStatus(id: number, status: AssistanceStatus): Observable<AssistanceI> {
    if (status === 'INACTIVO') {
      return this.deactivate(id);
    }

    return this.getById(id).pipe(
      switchMap(current =>
        this.update(id, {
          ...current,
          status
        })
      )
    );
  }
}
