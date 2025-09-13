export interface assistanceI {
  id?: number;
  studentId: number;   // referencia a studentI
  routeId: number;     // referencia a RouteI
  busId: number;       // referencia a busI
  date: Date;          // día de la asistencia
  time: string;        // hora de confirmación
  status: "CONFIRMADO" | "AUSENTE" | "CANCELADO";
  createdAt?: Date;
  updatedAt?: Date;
}
