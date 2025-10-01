import { Model } from "sequelize";
export interface route_assignment {
    id?: number;
    routeId: number;
    busId: number;
    driverId?: number;
    startDate: Date;
    endDate?: Date;
    status: "ACTIVO" | "INACTIVO";
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class RouteAssignment extends Model implements route_assignment {
    id: number;
    routeId: number;
    busId: number;
    driverId?: number;
    startDate: Date;
    endDate?: Date;
    status: "ACTIVO" | "INACTIVO";
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=route_assignment.d.ts.map