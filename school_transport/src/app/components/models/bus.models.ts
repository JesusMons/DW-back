export interface busI {
  id?: number;
  plate: string;
  capacity: number;
  mileage: number;
  model?: string;
  brand?: string;
  year?: number;
  color?: string;
  status?: "ACTIVO" | "INACTIVO" | "EN MANTENIMIENTO";
  insuranceExpiry?: Date;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
