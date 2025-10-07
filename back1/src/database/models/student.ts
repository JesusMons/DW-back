import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";


export type StudentStatus = "ACTIVO" | "INACTIVO" | "GRADUADO";


export interface StudentI {
id?: number;
name: string;
lastName: string;
document: string;
guardianId?: number | null;
grade?: number | null;
birthdate?: Date | null;
address?: string | null;
phone?: string | null;
guardianPhone?: string | null;
email?: string | null;
status?: StudentStatus;
allergies?: string[] | null;
emergencyContact?: { name: string; phone: string; relationship: string } | null;
}


export class Student extends Model implements StudentI {
public id!: number;
public name!: string;
public lastName!: string;
public document!: string;
public guardianId?: number | null;
public grade?: number | null;
public birthdate?: Date | null;
public address?: string | null;
public phone?: string | null;
public guardianPhone?: string | null;
public email?: string | null;
public status?: StudentStatus;
public allergies?: string[] | null;
public emergencyContact?: { name: string; phone: string; relationship: string } | null;
}


Student.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
name: { type: DataTypes.STRING(120), allowNull: false },
lastName: { field: "last_name", type: DataTypes.STRING(120), allowNull: false },
document: { type: DataTypes.STRING(32), allowNull: false, unique: true },
guardianId: { field: "guardian_id", type: DataTypes.BIGINT, allowNull: true },
grade: { type: DataTypes.INTEGER, allowNull: true },
birthdate: { type: DataTypes.DATEONLY, allowNull: true },
address: { type: DataTypes.STRING(190), allowNull: true },
phone: { type: DataTypes.STRING(30), allowNull: true },
guardianPhone: { field: "guardian_phone", type: DataTypes.STRING(30), allowNull: true },
email: { type: DataTypes.STRING(190), allowNull: true, validate: { isEmail: true } },
status: { type: DataTypes.ENUM("ACTIVO", "INACTIVO", "GRADUADO"), allowNull: false, defaultValue: "ACTIVO" },
allergies: { type: DataTypes.JSON, allowNull: true },
emergencyContact: { field: "emergency_contact", type: DataTypes.JSON, allowNull: true },
},
{ sequelize, modelName: "Student", tableName: "students", timestamps: true, underscored: true }
);