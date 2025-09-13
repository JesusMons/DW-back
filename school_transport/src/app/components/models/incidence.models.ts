export interface incidenceI {
  id?: number;
  busId: number;     // referencia a busI
  routeId: number;   // referencia a routeI
  description: string;
  severity: "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
  status: "ABIERTA" | "EN PROGRESO" | "RESUELTO" | "CERRADO";
  reportedAt: Date;
  resolvedAt?: Date;
  reportedBy: string;
  actionsTaken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
