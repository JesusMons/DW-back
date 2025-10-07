import { Model } from "sequelize";
export type StopStatus = "ACTIVA" | "INACTIVA";
export interface StopI {
    id?: number;
    name: string;
    direction: string;
    orderHint?: number | null;
    landmark?: string | null;
    status?: StopStatus;
}
export declare class Stop extends Model implements StopI {
    id: number;
    name: string;
    direction: string;
    orderHint?: number | null;
    landmark?: string | null;
    status?: StopStatus;
}
//# sourceMappingURL=stop.d.ts.map