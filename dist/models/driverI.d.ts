import { Model } from "sequelize";
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
    assignedBusId?: number | null;
    photoUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Driver extends Model implements driverI {
    id: number;
    name: string;
    document?: number | string;
    phone?: string;
    email?: string;
    address?: string;
    type_licence: string;
    licenceExpiry?: Date;
    experienceYears?: number;
    status: "ACTIVO" | "INACTIVO" | "SUSPENDIDO";
    assignedBusId?: number | null;
    photoUrl?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=driverI.d.ts.map