import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Route } from "./route";
import { Driver } from "./driver";
import { Bus } from "./bus";


export type ItineraryStatus = "PLANEADO" | "EN PROGRESO" | "COMPLETADO" | "CANCELADO";


export interface ItineraryI {
id?: number;
routeId: number;
date: Date;
departureTime: string; // TIME
arrivalTime: string; // TIME
driverId: number;
busId: number;
status?: ItineraryStatus;
notes?: string | null;
}


export class Itinerary extends Model implements ItineraryI {
public id!: number;
public routeId!: number;
public date!: Date;
public departureTime!: string;
public arrivalTime!: string;
public driverId!: number;
public busId!: number;
public status?: ItineraryStatus;
public notes?: string | null;
}


Itinerary.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
routeId: { field: "route_id", type: DataTypes.BIGINT, allowNull: false },
date: { type: DataTypes.DATEONLY, allowNull: false },
departureTime: { field: "departure_time", type: DataTypes.TIME, allowNull: false },
arrivalTime: { field: "arrival_time", type: DataTypes.TIME, allowNull: false },
driverId: { field: "driver_id", type: DataTypes.BIGINT, allowNull: false },
busId: { field: "bus_id", type: DataTypes.BIGINT, allowNull: false },
status: { type: DataTypes.ENUM("PLANEADO", "EN PROGRESO", "COMPLETADO", "CANCELADO"), allowNull: false, defaultValue: "PLANEADO" },
notes: { type: DataTypes.STRING(500), allowNull: true },
},
{ sequelize, modelName: "Itinerary", tableName: "itineraries", timestamps: true, underscored: true }
);


Itinerary.belongsTo(Route, { foreignKey: "routeId" });
Itinerary.belongsTo(Driver, { foreignKey: "driverId" });
Itinerary.belongsTo(Bus, { foreignKey: "busId" });
Route.hasMany(Itinerary, { foreignKey: "routeId" });
Driver.hasMany(Itinerary, { foreignKey: "driverId" });
Bus.hasMany(Itinerary, { foreignKey: "busId" });