import { Model } from "sequelize";
export interface ItineraryStopScheduleI {
    itineraryId: number;
    stopId: number;
    scheduledTime: string;
}
export declare class ItineraryStopSchedule extends Model implements ItineraryStopScheduleI {
    itineraryId: number;
    stopId: number;
    scheduledTime: string;
}
//# sourceMappingURL=ItineraryStopSchedule.d.ts.map