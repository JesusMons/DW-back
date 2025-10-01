import { Model } from "sequelize";
export interface stopI {
    id?: number;
    name: string;
    direction: string;
    order?: number;
    landmark?: string;
    status?: "ACTIVA" | "INACTIVA";
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Stop extends Model implements stopI {
    id: number;
    name: string;
    direction: string;
    order?: number;
    landmark?: string;
    status: "ACTIVA" | "INACTIVA";
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=stopI.d.ts.map