import { Model } from "sequelize";
export declare class Resource extends Model {
    id: number;
    path: string;
    method: string;
    status: "ACTIVO" | "INACTIVO";
}
export interface ResourceI {
    id?: number;
    path: string;
    method: string;
    status: "ACTIVO" | "INACTIVO";
}
//# sourceMappingURL=Resource.d.ts.map