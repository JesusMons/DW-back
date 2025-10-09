import { Model } from "sequelize";
export type ItineraryStatus = "ACTIVO" | "INACTIVO";
export interface ItineraryI {
    id?: number;
    routeId: number;
    date: Date;
    departureTime: string;
    arrivalTime: string;
    driverId: number;
    busId: number;
    status?: ItineraryStatus;
    notes?: string | null;
}
export declare class Itinerary extends Model implements ItineraryI {
    id: number;
    routeId: number;
    date: Date;
    departureTime: string;
    arrivalTime: string;
    driverId: number;
    busId: number;
    status?: ItineraryStatus;
    notes?: string | null;
}
//# sourceMappingURL=itinerari.d.ts.map