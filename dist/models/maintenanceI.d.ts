import { Model } from "sequelize";
export interface maintenanceI {
    id?: number;
    busId: number;
    type: "PREVENTIVO" | "CORRECTIVO" | "INSPECCION";
    description: string;
    cost?: number;
    performedAt: Date;
    nextDueDate?: Date;
    status: "PENDIENTE" | "EN PROGRESO" | "COMPLETADO";
    mechanic?: string;
    odometer?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Maintenance extends Model implements maintenanceI {
    id: number;
    busId: number;
    type: "PREVENTIVO" | "CORRECTIVO" | "INSPECCION";
    description: string;
    cost?: number;
    performedAt: Date;
    nextDueDate?: Date;
    status: "PENDIENTE" | "EN PROGRESO" | "COMPLETADO";
    mechanic?: string;
    odometer?: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=maintenanceI.d.ts.map