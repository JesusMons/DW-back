import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Student } from "./student";
import { Route } from "./route";
import { Bus } from "./bus";


export type AssistanceStatus = "ACTIVO" | "INACTIVO";


export interface AssistanceI {
id?: number;
studentId: number;
routeId: number;
busId: number;
date: Date;
time: string; // TIME
status?: AssistanceStatus;
}


export class Assistance extends Model implements AssistanceI {
public id!: number;
public studentId!: number;
public routeId!: number;
public busId!: number;
public date!: Date;
public time!: string;
public status?: AssistanceStatus;
}


Assistance.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
studentId: { field: "student_id", type: DataTypes.BIGINT, allowNull: false },
routeId: { field: "route_id", type: DataTypes.BIGINT, allowNull: false },
busId: { field: "bus_id", type: DataTypes.BIGINT, allowNull: false },
date: { type: DataTypes.DATEONLY, allowNull: false },
time: { type: DataTypes.TIME, allowNull: false },
status: { type: DataTypes.ENUM("ACTIVO", "INACTIVO"), allowNull: false, defaultValue: "ACTIVO" },
},
{ sequelize, modelName: "Assistance", tableName: "assistances", timestamps: true, underscored: true }
);


Assistance.belongsTo(Student, { foreignKey: "studentId" });
Assistance.belongsTo(Route, { foreignKey: "routeId" });
Assistance.belongsTo(Bus, { foreignKey: "busId" });
Student.hasMany(Assistance, { foreignKey: "studentId" });
Route.hasMany(Assistance, { foreignKey: "routeId" });
Bus.hasMany(Assistance, { foreignKey: "busId" });
