export interface route_assignment {
  id?: number;
  routeId: number;   // referencia a RouteI
  busId: number;     // referencia a busI
  driverId?: number; // referencia opcional a driverI
  startDate: Date;
  endDate?: Date;
  status: "ACTIVO" | "INACTIVO";
  createdAt?: Date;
  updatedAt?: Date;
}
