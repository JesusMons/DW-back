export interface maintenanceI {
  id?: number;
  busId: number; // referencia a busI
  type: "PREVENTIVO" | "CORRECTIVO" | "INSPECCION";
  description: string;
  cost?: number;
  performedAt: Date;
  nextDueDate?: Date;
  status: "PENDIENTE" | "EN PROGRESO" | "COMPLETADO";
  mechanic?: string;
  odometer?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
