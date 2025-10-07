import { Model } from "sequelize";
export type IncidenceSeverity = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
export type IncidenceStatus = "ABIERTA" | "EN PROGRESO" | "RESUELTO" | "CERRADO";
export interface IncidenceI {
    id?: number;
    busId: number;
    routeId: number;
    description: string;
    severity: IncidenceSeverity;
    status?: IncidenceStatus;
    reportedAt: Date;
    resolvedAt?: Date | null;
    reportedBy: string;
    actionsTaken?: string | null;
}
export declare class Incidence extends Model implements IncidenceI {
    id: number;
    busId: number;
    routeId: number;
    description: string;
    severity: IncidenceSeverity;
    status?: IncidenceStatus;
    reportedAt: Date;
    resolvedAt?: Date | null;
    reportedBy: string;
    actionsTaken?: string | null;
}
//# sourceMappingURL=incidence.d.ts.map