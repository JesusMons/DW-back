import { Model } from "sequelize";
export interface incidenceI {
    id?: number;
    busId: number;
    routeId: number;
    description: string;
    severity: "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
    status: "ABIERTA" | "EN PROGRESO" | "RESUELTO" | "CERRADO";
    reportedAt: Date;
    resolvedAt?: Date;
    reportedBy: string;
    actionsTaken?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Incidence extends Model implements incidenceI {
    id: number;
    busId: number;
    routeId: number;
    description: string;
    severity: "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
    status: "ABIERTA" | "EN PROGRESO" | "RESUELTO" | "CERRADO";
    reportedAt: Date;
    resolvedAt?: Date;
    reportedBy: string;
    actionsTaken?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=incidenceI.d.ts.map