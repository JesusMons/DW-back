export interface stopI {
  id?: number;
  name: string;
  direction: string;
  order?: number;
  landmark?: string;
  status?: "ACTIVA" | "INACTIVA";
  createdAt?: Date;
  updatedAt?: Date;
}
