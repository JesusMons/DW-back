export interface guardianI {
  id?: number;
  firstName: string;
  lastName: string;
  document: number;
  phone: string;
  email?: string;
  relationship: string; 
  address?: string;
  students?: number[]; 
  status?: "ACTIVO" | "INACTIVO";
  createdAt?: Date;
  updatedAt?: Date;
}
