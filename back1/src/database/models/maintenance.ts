import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Bus } from "./bus";


export type MaintenanceType = "PREVENTIVO" | "CORRECTIVO" | "INSPECCION";
export type MaintenanceStatus = "PENDIENTE" | "EN PROGRESO" | "COMPLETADO";


export interface MaintenanceI {
id?: number;
busId: number;
type: MaintenanceType;
description: string;
cost?: number | null;
performedAt: Date; // DATEONLY
nextDueDate?: Date | null; // DATEONLY
status?: MaintenanceStatus;
mechanic?: string | null;
odometer?: number | null;
}


export class Maintenance extends Model implements MaintenanceI {
public id!: number;
public busId!: number;
public type!: MaintenanceType;
public description!: string;
public cost?: number | null;
public performedAt!: Date;
public nextDueDate?: Date | null;
public status?: MaintenanceStatus;
public mechanic?: string | null;
public odometer?: number | null;
}


Maintenance.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
busId: { field: "bus_id", type: DataTypes.BIGINT, allowNull: false },
type: { type: DataTypes.ENUM("PREVENTIVO", "CORRECTIVO", "INSPECCION"), allowNull: false },
description: { type: DataTypes.STRING(500), allowNull: false },
cost: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
performedAt: { field: "performed_at", type: DataTypes.DATEONLY, allowNull: false },
nextDueDate: { field: "next_due_date", type: DataTypes.DATEONLY, allowNull: true },
status: { type: DataTypes.ENUM("PENDIENTE", "EN PROGRESO", "COMPLETADO"), allowNull: false, defaultValue: "PENDIENTE" },
mechanic: { type: DataTypes.STRING(120), allowNull: true },
odometer: { type: DataTypes.INTEGER, allowNull: true },
},
{ sequelize, modelName: "Maintenance", tableName: "maintenances", timestamps: true, underscored: true }
);


Maintenance.belongsTo(Bus, { foreignKey: "busId" });
Bus.hasMany(Maintenance, { foreignKey: "busId" });