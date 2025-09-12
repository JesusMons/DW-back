import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItineraryI } from '../models/itinerary.models';



@Injectable({ providedIn: 'root' })
export class ItineraryService {
  private store = new BehaviorSubject<ItineraryI[]>([
    {
      id: 1,
      routeId: 1,
      date: new Date(),
      departureTime: '06:30',
      arrivalTime: '07:45',
      stopsSchedule: [
        { stop: 'Parque Central', time: '06:40' },
        { stop: 'Av. Bolívar', time: '07:00' }
      ],
      driver: 'Carlos Gómez',
      bus: 101,
      status: 'PLANEADO',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  itineraries$ = this.store.asObservable();

  getAll() { return this.store.value; }
  getById(id: number) { return this.store.value.find(i => i.id === id); }

  add(it: ItineraryI) {
    const list = this.store.value;
    it.id = list.length ? Math.max(...list.map(x => x.id ?? 0)) + 1 : 1;
    it.createdAt = new Date(); it.updatedAt = new Date();
    this.store.next([...list, it]);
  }

  update(it: ItineraryI) {
    const list = this.store.value.slice();
    const idx = list.findIndex(x => x.id === it.id);
    if (idx >= 0) { it.updatedAt = new Date(); list[idx] = { ...it }; this.store.next(list); }
  }

  remove(id: number) {
    this.store.next(this.store.value.filter(x => x.id !== id));
  }
}
