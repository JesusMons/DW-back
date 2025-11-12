import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { RouteI, RouteStatus } from '../models/routes.models';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private readonly baseUrl = '/api/routes';
  private readonly store = new BehaviorSubject<RouteI[]>([]);
  private loaded = false;

  readonly routes$ = this.store.asObservable();

  constructor(private readonly http: HttpClient) {}

  /** Normaliza objetos desde API (campos snake_case incluidos). */
  private normalize(raw: any): RouteI {
    const normalizeDate = (value?: string | Date | null): Date | undefined =>
      !value ? undefined : value instanceof Date ? value : new Date(value);

    return {
      id: raw?.id ?? raw?.ID,
      name: raw?.name ?? '',
      startPoint: raw?.startPoint ?? raw?.start_point ?? '',
      endPoint: raw?.endPoint ?? raw?.end_point ?? '',
      currentBusId: raw?.currentBusId ?? raw?.current_bus_id ?? null,
      currentDriverId: raw?.currentDriverId ?? raw?.current_driver_id ?? null,
      status: (raw?.status as RouteStatus | undefined) ?? 'ACTIVO',
      createdAt: normalizeDate(raw?.createdAt ?? raw?.created_at),
      updatedAt: normalizeDate(raw?.updatedAt ?? raw?.updated_at)
    };
  }

  private normalizeList(resp: any): RouteI[] {
    const list =
      resp?.routes ??
      (Array.isArray(resp?.data) ? resp.data : resp?.data?.routes) ??
      resp ??
      [];

    return Array.isArray(list) ? list.map(item => this.normalize(item)) : [];
  }

  private replace(route: RouteI) {
    const list = this.store.value;
    const idx = list.findIndex(r => r.id === route.id);
    if (idx === -1) {
      this.store.next([...list, route]);
    } else {
      const next = [...list];
      next[idx] = route;
      this.store.next(next);
    }
  }

  loadAll(force = false): void {
    if (this.loaded && !force) {
      return;
    }
    this.fetchAll().subscribe({
      error: err => console.error('Error cargando rutas', err)
    });
  }

  fetchAll(): Observable<RouteI[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(resp => this.normalizeList(resp)),
      tap(routes => {
        this.store.next(routes);
        this.loaded = true;
      })
    );
  }

  getRoutes(): RouteI[] {
    if (!this.loaded) {
      this.loadAll();
    }
    return this.store.value;
  }

  getById(id: number): Observable<RouteI> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(map(resp => this.normalize(resp)));
  }

  create(payload: RouteI): Observable<RouteI> {
    return this.http.post<any>(this.baseUrl, payload).pipe(
      map(resp => this.normalize(resp)),
      tap(route => this.store.next([...this.store.value, route]))
    );
  }

  update(id: number, payload: RouteI): Observable<RouteI> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload).pipe(
      map(resp => this.normalize(resp)),
      tap(route => this.replace(route))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.store.next(this.store.value.filter(r => r.id !== id)))
    );
  }

  deactivate(id: number): Observable<RouteI> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/deactivate`, {}).pipe(
      switchMap(() => this.getById(id)),
      tap(route => this.replace(route))
    );
  }
}
