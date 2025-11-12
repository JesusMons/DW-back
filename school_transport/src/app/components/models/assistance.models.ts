export type AssistanceStatus = "ACTIVO" | "INACTIVO";

export interface AssistanceI {
  id?: number;
  studentId: number;
  routeId: number;
  busId: number;
  date: Date;
  time: string; // TIME
  status?: AssistanceStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
