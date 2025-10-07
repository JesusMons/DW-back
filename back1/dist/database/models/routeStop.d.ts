import { Model } from "sequelize";
export interface RouteStopI {
    routeId: number;
    stopId: number;
    position: number;
    scheduledTimeHint?: string | null;
}
export declare class RouteStop extends Model implements RouteStopI {
    routeId: number;
    stopId: number;
    position: number;
    scheduledTimeHint?: string | null;
}
//# sourceMappingURL=routeStop.d.ts.map