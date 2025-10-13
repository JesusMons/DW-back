import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Student } from "./student"; // define Guardian ↔ Student aquí


export type GuardianStatus = "ACTIVO" | "INACTIVO";


export interface GuardianI {
id?: number;
firstName: string;
lastName: string;
document: string;
phone: string;
email?: string | null;
relationship: string;
address?: string | null;
status?: GuardianStatus;
}


export class Guardian extends Model implements GuardianI {
public id!: number;
public firstName!: string;
public lastName!: string;
public document!: string;
public phone!: string;
public email?: string | null;
public relationship!: string;
public address?: string | null;
public status?: GuardianStatus;
}


Guardian.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
firstName: { field: "first_name", type: DataTypes.STRING(80), allowNull: false },
lastName: { field: "last_name", type: DataTypes.STRING(80), allowNull: false },
document: { type: DataTypes.STRING(32), allowNull: false, unique: true },
phone: { type: DataTypes.STRING(30), allowNull: false },
email: { type: DataTypes.STRING(190), allowNull: true, validate: { isEmail: true } },
relationship: { type: DataTypes.STRING(60), allowNull: false },
address: { type: DataTypes.STRING(190), allowNull: true },
status: {
  type: DataTypes.STRING(20),
  allowNull: false,
  defaultValue: "ACTIVO",
  validate: { isIn: [["ACTIVO", "INACTIVO"]] },
},
},
{ sequelize, modelName: "Guardian", tableName: "guardians", timestamps: true, underscored: true }
);


Guardian.hasMany(Student, { foreignKey: "guardianId", sourceKey: "id" });
Student.belongsTo(Guardian, { foreignKey: "guardianId", targetKey: "id" });
