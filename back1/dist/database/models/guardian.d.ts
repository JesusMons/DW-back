import { Model } from "sequelize";
export type GuardianStatus = "ACTIVO" | "INACTIVO";
export interface GuardianI {
    id?: number;
    firstName: string;
    lastName: string;
    document: string;
    phone: string;
    email?: string | null;
    relationship: string;
    address?: string | null;
    status?: GuardianStatus;
}
export declare class Guardian extends Model implements GuardianI {
    id: number;
    firstName: string;
    lastName: string;
    document: string;
    phone: string;
    email?: string | null;
    relationship: string;
    address?: string | null;
    status?: GuardianStatus;
}
//# sourceMappingURL=guardian.d.ts.map