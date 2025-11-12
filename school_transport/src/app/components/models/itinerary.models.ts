export type ItineraryStatus = "ACTIVO" | "INACTIVO";

export interface ItineraryI {
  id?: number;
  routeId: number;
  date: Date;
  departureTime: string;
  arrivalTime: string;
  driverId: number;
  busId: number;
  status?: ItineraryStatus;
  notes?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
