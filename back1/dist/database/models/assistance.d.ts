import { Model } from "sequelize";
export type AssistanceStatus = "CONFIRMADO" | "AUSENTE" | "CANCELADO";
export interface AssistanceI {
    id?: number;
    studentId: number;
    routeId: number;
    busId: number;
    date: Date;
    time: string;
    status?: AssistanceStatus;
}
export declare class Assistance extends Model implements AssistanceI {
    id: number;
    studentId: number;
    routeId: number;
    busId: number;
    date: Date;
    time: string;
    status?: AssistanceStatus;
}
//# sourceMappingURL=assistance.d.ts.map