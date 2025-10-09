import { Model } from "sequelize";
export type BusStatus = "ACTIVO" | "INACTIVO";
export interface BusI {
    id?: number;
    plate: string;
    capacity: number;
    mileage: number;
    model?: string | null;
    brand?: string | null;
    year?: number | null;
    color?: string | null;
    status?: BusStatus;
    insuranceExpiry?: Date | null;
    lastMaintenance?: Date | null;
    nextMaintenance?: Date | null;
}
export declare class Bus extends Model implements BusI {
    id: number;
    plate: string;
    capacity: number;
    mileage: number;
    model?: string | null;
    brand?: string | null;
    year?: number | null;
    color?: string | null;
    status?: BusStatus;
    insuranceExpiry?: Date | null;
    lastMaintenance?: Date | null;
    nextMaintenance?: Date | null;
}
//# sourceMappingURL=bus.d.ts.map