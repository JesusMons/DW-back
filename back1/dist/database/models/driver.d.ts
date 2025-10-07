import { Model } from "sequelize";
export type DriverStatus = "ACTIVO" | "INACTIVO" | "SUSPENDIDO";
export interface DriverI {
    id?: number;
    name: string;
    document?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    typeLicence: string;
    licenceExpiry?: Date | null;
    experienceYears?: number | null;
    status?: DriverStatus;
    assignedBusId?: number | null;
    photoUrl?: string | null;
}
export declare class Driver extends Model implements DriverI {
    id: number;
    name: string;
    document?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    typeLicence: string;
    licenceExpiry?: Date | null;
    experienceYears?: number | null;
    status?: DriverStatus;
    assignedBusId?: number | null;
    photoUrl?: string | null;
}
//# sourceMappingURL=driver.d.ts.map