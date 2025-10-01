import { Model } from "sequelize";
export interface RouteI {
    id?: number;
    name: string;
    stops: string[];
    startPoint: string;
    endPoint: string;
    schedule: string[];
    busId: number;
    driver: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Route extends Model implements RouteI {
    id: number;
    name: string;
    stops: string[];
    startPoint: string;
    endPoint: string;
    schedule: string[];
    busId: number;
    driver: string;
    status: "ACTIVE" | "INACTIVE";
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=RouteI.d.ts.map