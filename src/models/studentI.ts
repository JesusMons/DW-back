import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Assistance } from "./assistanceI";

export interface studentI {
  id?: number;
  name: string;
  last_name: string;
  document: number;
  guardian: string;
  grade?: number;
  birthdate?: Date;
  address?: string;
  phone?: string;
  guardianPhone?: string;
  email?: string;
  status?: "ACTIVO" | "INACTIVO" | "GRADUADO";
  allergies?: string[]; // JSON
  emergencyContact?: { name: string; phone: string; relationship: string }; // JSON
  createdAt?: Date;
  updatedAt?: Date;
}

export class Student extends Model implements studentI {
  public id!: number;
  public name!: string;
  public last_name!: string;
  public document!: number;
  public guardian!: string;
  public grade?: number;
  public birthdate?: Date;
  public address?: string;
  public phone?: string;
  public guardianPhone?: string;
  public email?: string;
  public status!: "ACTIVO" | "INACTIVO" | "GRADUADO";
  public allergies?: string[];
  public emergencyContact?: { name: string; phone: string; relationship: string };
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    name: { type: DataTypes.STRING(120), allowNull: false },
    last_name: { type: DataTypes.STRING(120), allowNull: false },
    document: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    guardian: { type: DataTypes.STRING(120), allowNull: false },
    grade: DataTypes.INTEGER,
    birthdate: DataTypes.DATEONLY,
    address: DataTypes.STRING(200),
    phone: DataTypes.STRING(30),
    guardianPhone: DataTypes.STRING(30),
    email: { type: DataTypes.STRING(120), validate: { isEmail: true } },
    status: { type: DataTypes.ENUM("ACTIVO", "INACTIVO", "GRADUADO"), defaultValue: "ACTIVO" },
    allergies: DataTypes.JSON,
    emergencyContact: DataTypes.JSON,
  },
  { sequelize, modelName: "Student", tableName: "students", timestamps: true }
);

// Asociaciones
Student.hasMany(Assistance, { foreignKey: "student_id", sourceKey: "id", as: "assistances" });
Assistance.belongsTo(Student, { foreignKey: "student_id", targetKey: "id", as: "student" });

// Las relaciones directas con Guardian se modelan mediante atributos en Student, sin FK física.
