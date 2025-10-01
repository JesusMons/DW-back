import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

export interface guardianI {
  id?: number;
  firstName: string;
  lastName: string;
  document: number;
  phone: string;
  email?: string;
  relationship: string;
  address?: string;
  students?: number[]; // JSON
  status?: "ACTIVO" | "INACTIVO";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Guardian extends Model implements guardianI {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public document!: number;
  public phone!: string;
  public email?: string;
  public relationship!: string;
  public address?: string;
  public students?: number[];
  public status!: "ACTIVO" | "INACTIVO";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Guardian.init(
  {
    firstName: { type: DataTypes.STRING(80), allowNull: false },
    lastName: { type: DataTypes.STRING(80), allowNull: false },
    document: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(30), allowNull: false },
    email: { type: DataTypes.STRING(120), validate: { isEmail: true } },
    relationship: { type: DataTypes.STRING(50), allowNull: false },
    address: DataTypes.STRING(200),
    students: DataTypes.JSON,
    status: { type: DataTypes.ENUM("ACTIVO", "INACTIVO"), defaultValue: "ACTIVO" },
  },
  { sequelize, modelName: "Guardian", tableName: "guardians", timestamps: true }
);

// (Sin FKs físicas en tu diseño actual)
