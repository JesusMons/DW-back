import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Route } from "./route";
import { Bus } from "./bus";
import { Driver } from "./driver";


export type AssignmentStatus = "ACTIVO" | "INACTIVO";


export interface RouteAssignmentI {
id?: number;
routeId: number;
busId: number;
driverId?: number | null;
startDate: Date;
endDate?: Date | null;
status?: AssignmentStatus;
}


export class RouteAssignment extends Model implements RouteAssignmentI {
public id!: number;
public routeId!: number;
public busId!: number;
public driverId?: number | null;
public startDate!: Date;
public endDate?: Date | null;
public status?: AssignmentStatus;
}


RouteAssignment.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
routeId: { field: "route_id", type: DataTypes.BIGINT, allowNull: false },
busId: { field: "bus_id", type: DataTypes.BIGINT, allowNull: false },
driverId: { field: "driver_id", type: DataTypes.BIGINT, allowNull: true },
startDate: { field: "start_date", type: DataTypes.DATEONLY, allowNull: false },
endDate: { field: "end_date", type: DataTypes.DATEONLY, allowNull: true },
status: { type: DataTypes.ENUM("ACTIVO", "INACTIVO"), allowNull: false, defaultValue: "ACTIVO" },
},
{ sequelize, modelName: "RouteAssignment", tableName: "route_assignments", timestamps: true, underscored: true }
);


// Relaciones históricas
RouteAssignment.belongsTo(Route, { foreignKey: "routeId" });
RouteAssignment.belongsTo(Bus, { foreignKey: "busId" });
RouteAssignment.belongsTo(Driver, { foreignKey: "driverId" });
Route.hasMany(RouteAssignment, { foreignKey: "routeId", as: "assignments" });
Bus.hasMany(RouteAssignment, { foreignKey: "busId", as: "assignments" });
Driver.hasMany(RouteAssignment, { foreignKey: "driverId", as: "assignments" });