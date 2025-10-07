import { Model } from "sequelize";
export type MaintenanceType = "PREVENTIVO" | "CORRECTIVO" | "INSPECCION";
export type MaintenanceStatus = "PENDIENTE" | "EN PROGRESO" | "COMPLETADO";
export interface MaintenanceI {
    id?: number;
    busId: number;
    type: MaintenanceType;
    description: string;
    cost?: number | null;
    performedAt: Date;
    nextDueDate?: Date | null;
    status?: MaintenanceStatus;
    mechanic?: string | null;
    odometer?: number | null;
}
export declare class Maintenance extends Model implements MaintenanceI {
    id: number;
    busId: number;
    type: MaintenanceType;
    description: string;
    cost?: number | null;
    performedAt: Date;
    nextDueDate?: Date | null;
    status?: MaintenanceStatus;
    mechanic?: string | null;
    odometer?: number | null;
}
//# sourceMappingURL=maintenance.d.ts.map