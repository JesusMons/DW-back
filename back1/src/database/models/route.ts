import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Bus } from "./bus"; // definir Route ↔ Bus/Driver aquí
import { Driver } from "./driver";


export type RouteStatus = "ACTIVE" | "INACTIVE";


export interface RouteI {
id?: number;
name: string;
startPoint: string;
endPoint: string;
currentBusId?: number | null;
currentDriverId?: number | null;
status?: RouteStatus;
}


export class Route extends Model implements RouteI {
public id!: number;
public name!: string;
public startPoint!: string;
public endPoint!: string;
public currentBusId?: number | null;
public currentDriverId?: number | null;
public status?: RouteStatus;
}


Route.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
name: { type: DataTypes.STRING(120), allowNull: false },
startPoint: { field: "start_point", type: DataTypes.STRING(190), allowNull: false },
endPoint: { field: "end_point", type: DataTypes.STRING(190), allowNull: false },
currentBusId: { field: "current_bus_id", type: DataTypes.BIGINT, allowNull: true },
currentDriverId: { field: "current_driver_id", type: DataTypes.BIGINT, allowNull: true },
status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
},
{ sequelize, modelName: "Route", tableName: "routes", timestamps: true, underscored: true }
);


// Relaciones Route ↔ Bus/Driver (y lado inverso aquí)
Route.belongsTo(Bus, { as: "currentBus", foreignKey: "currentBusId", targetKey: "id" });
Bus.hasMany(Route, { as: "routesAsCurrent", foreignKey: "currentBusId", sourceKey: "id" });


Route.belongsTo(Driver, { as: "currentDriver", foreignKey: "currentDriverId", targetKey: "id" });
Driver.hasMany(Route, { as: "routesAsCurrentDriver", foreignKey: "currentDriverId", sourceKey: "id" });