import { Model } from "sequelize";
export type RouteStatus = "ACTIVE" | "INACTIVE";
export interface RouteI {
    id?: number;
    name: string;
    startPoint: string;
    endPoint: string;
    currentBusId?: number | null;
    currentDriverId?: number | null;
    status?: RouteStatus;
}
export declare class Route extends Model implements RouteI {
    id: number;
    name: string;
    startPoint: string;
    endPoint: string;
    currentBusId?: number | null;
    currentDriverId?: number | null;
    status?: RouteStatus;
}
//# sourceMappingURL=route.d.ts.map