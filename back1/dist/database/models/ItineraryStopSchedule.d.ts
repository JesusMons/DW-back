import { Model } from "sequelize";
export interface ItineraryStopScheduleI {
    itineraryId: number;
    stopId: number;
    scheduledTime: string;
    status?: "ACTIVO" | "INACTIVO";
}
export declare class ItineraryStopSchedule extends Model implements ItineraryStopScheduleI {
    itineraryId: number;
    stopId: number;
    scheduledTime: string;
    status?: "ACTIVO" | "INACTIVO";
}
//# sourceMappingURL=ItineraryStopSchedule.d.ts.map