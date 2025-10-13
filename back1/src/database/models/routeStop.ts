import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Route } from "./route";
import { Stop } from "./stop";


export interface RouteStopI {
routeId: number;
stopId: number;
position: number;
scheduledTimeHint?: string | null; // TIME
status?: "ACTIVO" | "INACTIVO";
}


export class RouteStop extends Model implements RouteStopI {
public routeId!: number;
public stopId!: number;
public position!: number;
public scheduledTimeHint?: string | null;
public status?: "ACTIVO" | "INACTIVO";
}


RouteStop.init(
{
routeId: { field: "route_id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
stopId: { field: "stop_id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
position: { type: DataTypes.INTEGER, allowNull: false },
scheduledTimeHint: {
  field: "scheduled_time_hint",
  type: DataTypes.STRING(8),
  allowNull: true,
  validate: {
    is: /^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/,
  },
},
status: {
  type: DataTypes.STRING(20),
  allowNull: false,
  defaultValue: "ACTIVO",
  validate: { isIn: [["ACTIVO", "INACTIVO"]] },
},
},
{ sequelize, modelName: "RouteStop", tableName: "route_stops", timestamps: false, underscored: true }
);


// m:n Route ↔ Stop (más acceso a filas puente)
Route.belongsToMany(Stop, { through: RouteStop, foreignKey: "routeId", otherKey: "stopId", as: "stops" });
Stop.belongsToMany(Route, { through: RouteStop, foreignKey: "stopId", otherKey: "routeId", as: "routes" });
Route.hasMany(RouteStop, { foreignKey: "routeId", as: "routeStops" });
Stop.hasMany(RouteStop, { foreignKey: "stopId", as: "routeStops" });
RouteStop.belongsTo(Route, { foreignKey: "routeId" });
RouteStop.belongsTo(Stop, { foreignKey: "stopId" });
