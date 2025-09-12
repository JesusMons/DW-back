export interface ItineraryI {
  id?: number;
  routeId: number; // Relación con RouteI
  date: Date;
  departureTime: string;
  arrivalTime: string;
  stopsSchedule: { stop: string; time: string }[];
  driver: string;
  bus: number;
  status: "PLANEADO" | "EN PROGRESO" | "COMPLETADO" | "CANCELADO";
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
