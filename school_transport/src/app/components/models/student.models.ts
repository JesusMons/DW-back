export interface studentI {
  id?: number;
  name: string;
  last_name: string;
  document: number;
  guardian: string;
  grade?: number;
  birthdate?: Date;
  address?: string;
  phone?: string;
  guardianPhone?: string;
  email?: string;
  status?: "ACTIVO" | "INACTIVO" | "GRADUADO";
  allergies?: string[];
  emergencyContact?: { name: string; phone: string; relationship: string };
  createdAt?: Date;
  updatedAt?: Date;
}
