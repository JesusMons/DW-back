import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";


export type DriverStatus = "ACTIVO" | "INACTIVO";


export interface DriverI {
id?: number;
name: string;
document?: string | null;
phone?: string | null;
email?: string | null;
address?: string | null;
typeLicence: string;
licenceExpiry?: Date | null;
experienceYears?: number | null;
status?: DriverStatus;
assignedBusId?: number | null;
photoUrl?: string | null;
}


export class Driver extends Model implements DriverI {
public id!: number;
public name!: string;
public document?: string | null;
public phone?: string | null;
public email?: string | null;
public address?: string | null;
public typeLicence!: string;
public licenceExpiry?: Date | null;
public experienceYears?: number | null;
public status?: DriverStatus;
public assignedBusId?: number | null;
public photoUrl?: string | null;
}


Driver.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
name: { type: DataTypes.STRING(120), allowNull: false },
document: { type: DataTypes.STRING(32), allowNull: true },
phone: { type: DataTypes.STRING(30), allowNull: true },
email: { type: DataTypes.STRING(190), allowNull: true, validate: { isEmail: true } },
address: { type: DataTypes.STRING(190), allowNull: true },
typeLicence: { field: "type_licence", type: DataTypes.STRING(32), allowNull: false },
licenceExpiry: { field: "licence_expiry", type: DataTypes.DATEONLY, allowNull: true },
experienceYears: { field: "experience_years", type: DataTypes.INTEGER, allowNull: true },
status: { type: DataTypes.ENUM("ACTIVO", "INACTIVO"), allowNull: false, defaultValue: "ACTIVO" },
assignedBusId: { field: "assigned_bus_id", type: DataTypes.BIGINT, allowNull: true },
photoUrl: { field: "photo_url", type: DataTypes.STRING(255), allowNull: true },
},
{ sequelize, modelName: "Driver", tableName: "drivers", timestamps: true, underscored: true }
);
