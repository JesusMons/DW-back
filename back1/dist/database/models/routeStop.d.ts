import { Model } from "sequelize";
export interface RouteStopI {
    routeId: number;
    stopId: number;
    position: number;
    scheduledTimeHint?: string | null;
    status?: "ACTIVO" | "INACTIVO";
}
export declare class RouteStop extends Model implements RouteStopI {
    routeId: number;
    stopId: number;
    position: number;
    scheduledTimeHint?: string | null;
    status?: "ACTIVO" | "INACTIVO";
}
//# sourceMappingURL=routeStop.d.ts.map