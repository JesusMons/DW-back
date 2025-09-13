export interface driverI {
  id?: number;
  name: string;
  document?: number | string;
  phone?: string;
  email?: string;
  address?: string;
  type_licence: string;
  licenceExpiry?: Date;
  experienceYears?: number;
  status?: "ACTIVO" | "INACTIVO" | "SUSPENDIDO";
  assignedBusId?: number;
  photoUrl?: string; // 👉 URL de la foto del conductor
  createdAt?: Date;
  updatedAt?: Date;
}
