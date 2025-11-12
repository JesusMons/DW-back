export type RouteStatus = "ACTIVO" | "INACTIVO";

export interface RouteI {
  id?: number;
  name: string;
  startPoint: string;
  endPoint: string;
  currentBusId?: number | null;
  currentDriverId?: number | null;
  status?: RouteStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
