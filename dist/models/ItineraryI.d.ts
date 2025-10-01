import { Model } from "sequelize";
export interface ItineraryI {
    id?: number;
    routeId: number;
    date: Date;
    departureTime: string;
    arrivalTime: string;
    stopsSchedule: {
        stop: string;
        time: string;
    }[];
    driver: string;
    busId: number;
    status: "PLANEADO" | "EN PROGRESO" | "COMPLETADO" | "CANCELADO";
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Itinerary extends Model implements ItineraryI {
    id: number;
    routeId: number;
    date: Date;
    departureTime: string;
    arrivalTime: string;
    stopsSchedule: {
        stop: string;
        time: string;
    }[];
    driver: string;
    busId: number;
    status: "PLANEADO" | "EN PROGRESO" | "COMPLETADO" | "CANCELADO";
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=ItineraryI.d.ts.map