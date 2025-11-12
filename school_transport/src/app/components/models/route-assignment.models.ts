export interface route_assignment {
  id?: number;
  routeId: number;   
  busId: number;     
  driverId?: number; 
  startDate: Date;
  endDate?: Date;
  status: "ACTIVO" | "INACTIVO";
  createdAt?: Date;
  updatedAt?: Date;
}
