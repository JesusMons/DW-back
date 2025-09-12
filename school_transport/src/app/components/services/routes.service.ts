import { Injectable } from '@angular/core';
import { RouteI } from '../models/routes.models';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  
  private routeService = new BehaviorSubject<RouteI[]>([
  {
    id: 1,
    name: "Ruta Norte",
    stops: ["Parque Central", "Av. Bolívar", "Colegio Nacional"],
    startPoint: "Terminal Norte",
    endPoint: "Universidad de La Guajira",
    schedule: ["06:30", "12:00", "18:00"],
    bus: 101,
    driver: "Carlos Gómez",
    status: "ACTIVE",
    createdAt: new Date("2025-01-10T08:00:00"),
    updatedAt: new Date("2025-09-01T14:30:00")
  },
  {
    id: 2,
    name: "Ruta Sur",
    stops: ["Hospital", "Plaza Mayor", "Barrio San José"],
    startPoint: "Terminal Sur",
    endPoint: "Colegio San Martín",
    schedule: ["07:00", "13:00", "19:00"],
    bus: 202,
    driver: "María López",
    status: "ACTIVE",
    createdAt: new Date("2025-02-05T09:00:00"),
    updatedAt: new Date("2025-08-28T16:45:00")
  },
  {
    id: 3,
    name: "Ruta Centro",
    stops: ["Estadio", "Av. Libertador", "Plaza del Sol"],
    startPoint: "Parque Industrial",
    endPoint: "Centro Comercial Guajira Plaza",
    schedule: ["08:00", "14:00", "20:00"],
    bus: 303,
    driver: "José Pérez",
    status: "INACTIVE",
    createdAt: new Date("2025-03-15T10:00:00"),
    updatedAt: new Date("2025-07-20T18:20:00")
  }
]);

routes$ = this.routeService.asObservable();

getRoutes(){
  return this.routeService.value;
}

addRoute(route: RouteI){
  const routes = this.routeService.value;
  route.id = routes.length ? Math.max(...routes.map(r => r.id ?? 0)) + 1:1;
  this.routeService.next([...routes, route]);
}

updateRoute(id: number, changes: Partial<RouteI>): boolean {
  const routes = this.routeService.value;              // valor actual del BehaviorSubject
  const idx = routes.findIndex(r => r.id === id);      // buscamos la ruta por id
  if (idx === -1) return false;                        // si no existe, devolvemos false

  const updated: RouteI = {                            // ruta actualizada
    ...routes[idx], 
    ...changes, 
    updatedAt: new Date()
  };

  // Inmutabilidad: creamos un nuevo array
  const next = [...routes];
  next[idx] = updated;

  // Emitimos el nuevo array a todos los suscriptores
  this.routeService.next(next);

  return true; // confirmamos que sí se actualizó
}

deleteRoute(id: number): boolean {
  const current = this.routeService.value;
  const exists = current.some(r => r.id === id);
  if (!exists) return false;

  // inmutabilidad: creamos un nuevo array sin la ruta eliminada
  const next = current.filter(r => r.id !== id);
  this.routeService.next(next);

  return true;
}



}
