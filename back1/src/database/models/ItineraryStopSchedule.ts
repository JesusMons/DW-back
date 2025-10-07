import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Itinerary } from "./itinerari";
import { Stop } from "./stop";


export interface ItineraryStopScheduleI {
itineraryId: number;
stopId: number;
scheduledTime: string; // TIME
}


export class ItineraryStopSchedule extends Model implements ItineraryStopScheduleI {
public itineraryId!: number;
public stopId!: number;
public scheduledTime!: string;
}


ItineraryStopSchedule.init(
{
itineraryId: { field: "itinerary_id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
stopId: { field: "stop_id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
scheduledTime: { field: "scheduled_time", type: DataTypes.TIME, allowNull: false },
},
{ sequelize, modelName: "ItineraryStopSchedule", tableName: "itinerary_stop_schedule", timestamps: false, underscored: true }
);


// m:n Itinerary ↔ Stop (definido aquí para evitar ciclos)
Itinerary.belongsToMany(Stop, { through: ItineraryStopSchedule, foreignKey: "itineraryId", otherKey: "stopId", as: "stops" });
Stop.belongsToMany(Itinerary, { through: ItineraryStopSchedule, foreignKey: "stopId", otherKey: "itineraryId", as: "itineraries" });
Itinerary.hasMany(ItineraryStopSchedule, { foreignKey: "itineraryId", as: "stopSchedule" });
Stop.hasMany(ItineraryStopSchedule, { foreignKey: "stopId", as: "itinerarySchedule" });
ItineraryStopSchedule.belongsTo(Itinerary, { foreignKey: "itineraryId" });
ItineraryStopSchedule.belongsTo(Stop, { foreignKey: "stopId" });