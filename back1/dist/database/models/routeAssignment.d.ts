import { Model } from "sequelize";
export type AssignmentStatus = "ACTIVO" | "INACTIVO";
export interface RouteAssignmentI {
    id?: number;
    routeId: number;
    busId: number;
    driverId?: number | null;
    startDate: Date;
    endDate?: Date | null;
    status?: AssignmentStatus;
}
export declare class RouteAssignment extends Model implements RouteAssignmentI {
    id: number;
    routeId: number;
    busId: number;
    driverId?: number | null;
    startDate: Date;
    endDate?: Date | null;
    status?: AssignmentStatus;
}
//# sourceMappingURL=routeAssignment.d.ts.map