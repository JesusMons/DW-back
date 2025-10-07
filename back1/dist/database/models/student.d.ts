import { Model } from "sequelize";
export type StudentStatus = "ACTIVO" | "INACTIVO" | "GRADUADO";
export interface StudentI {
    id?: number;
    name: string;
    lastName: string;
    document: string;
    guardianId?: number | null;
    grade?: number | null;
    birthdate?: Date | null;
    address?: string | null;
    phone?: string | null;
    guardianPhone?: string | null;
    email?: string | null;
    status?: StudentStatus;
    allergies?: string[] | null;
    emergencyContact?: {
        name: string;
        phone: string;
        relationship: string;
    } | null;
}
export declare class Student extends Model implements StudentI {
    id: number;
    name: string;
    lastName: string;
    document: string;
    guardianId?: number | null;
    grade?: number | null;
    birthdate?: Date | null;
    address?: string | null;
    phone?: string | null;
    guardianPhone?: string | null;
    email?: string | null;
    status?: StudentStatus;
    allergies?: string[] | null;
    emergencyContact?: {
        name: string;
        phone: string;
        relationship: string;
    } | null;
}
//# sourceMappingURL=student.d.ts.map