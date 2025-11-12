import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { ItineraryI, ItineraryStatus } from '../models/itinerary.models';

@Injectable({ providedIn: 'root' })
export class ItineraryService {
  private readonly baseUrl = '/api/itineraries';
  private readonly store = new BehaviorSubject<ItineraryI[]>([]);
  private loaded = false;

  readonly itineraries$ = this.store.asObservable();

  constructor(private readonly http: HttpClient) {}

  private normalize(raw: any): ItineraryI {
    if (!raw) {
      return raw;
    }

    const normalizeDate = (value?: string | Date | null): Date =>
      value instanceof Date ? value : new Date(value ?? Date.now());

    const normalizeTime = (value?: string): string => value ?? '';

    return {
      id: raw?.id ?? raw?.ID,
      routeId: Number(raw?.routeId ?? raw?.route_id ?? 0),
      date: normalizeDate(raw?.date),
      departureTime: normalizeTime(raw?.departureTime ?? raw?.departure_time),
      arrivalTime: normalizeTime(raw?.arrivalTime ?? raw?.arrival_time),
      driverId: Number(raw?.driverId ?? raw?.driver_id ?? 0),
      busId: Number(raw?.busId ?? raw?.bus_id ?? 0),
      status: (raw?.status as ItineraryStatus | undefined) ?? 'ACTIVO',
      notes: raw?.notes ?? null,
      createdAt: raw?.createdAt ? new Date(raw.createdAt) : undefined,
      updatedAt: raw?.updatedAt ? new Date(raw.updatedAt) : undefined
    };
  }

  private normalizeList(resp: any): ItineraryI[] {
    const list =
      resp?.itineraries ??
      (Array.isArray(resp?.data) ? resp.data : resp?.data?.itineraries) ??
      resp ??
      [];

    return Array.isArray(list) ? list.map(item => this.normalize(item)) : [];
  }

  private replace(itinerary: ItineraryI) {
    const list = this.store.value;
    const idx = list.findIndex(it => it.id === itinerary.id);
    if (idx === -1) {
      this.store.next([...list, itinerary]);
    } else {
      const clone = [...list];
      clone[idx] = itinerary;
      this.store.next(clone);
    }
  }

  loadAll(force = false): void {
    if (this.loaded && !force) return;
    this.fetchAll().subscribe({
      error: err => console.error('Error cargando itinerarios', err)
    });
  }

  fetchAll(): Observable<ItineraryI[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(resp => this.normalizeList(resp)),
      tap(list => {
        this.store.next(list);
        this.loaded = true;
      })
    );
  }

  getSnapshot(): ItineraryI[] {
    if (!this.loaded) {
      this.loadAll();
    }
    return this.store.value;
  }

  getById(id: number): Observable<ItineraryI> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(map(resp => this.normalize(resp)));
  }

  create(payload: ItineraryI): Observable<ItineraryI> {
    return this.http.post<any>(this.baseUrl, payload).pipe(
      map(resp => this.normalize(resp)),
      tap(it => this.store.next([...this.store.value, it]))
    );
  }

  update(id: number, payload: ItineraryI): Observable<ItineraryI> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload).pipe(
      map(resp => this.normalize(resp)),
      tap(it => this.replace(it))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.store.next(this.store.value.filter(it => it.id !== id)))
    );
  }

  deactivate(id: number): Observable<ItineraryI> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/deactivate`, {}).pipe(
      switchMap(() => this.getById(id)),
      tap(it => this.replace(it))
    );
  }
}
