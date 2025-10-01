import { Model } from "sequelize";
export interface AssistanceI {
    id?: number;
    student_id: number;
    route_id: number;
    bus_id: number;
    date: Date;
    time: string;
    status: "CONFIRMADO" | "AUSENTE" | "CANCELADO";
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Assistance extends Model implements AssistanceI {
    id: number;
    student_id: number;
    route_id: number;
    bus_id: number;
    date: Date;
    time: string;
    status: "CONFIRMADO" | "AUSENTE" | "CANCELADO";
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=assistanceI.d.ts.map