import { Model } from "sequelize";
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
export declare class Guardian extends Model implements guardianI {
    id: number;
    firstName: string;
    lastName: string;
    document: number;
    phone: string;
    email?: string;
    relationship: string;
    address?: string;
    students?: number[];
    status: "ACTIVO" | "INACTIVO";
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=guardianI.d.ts.map