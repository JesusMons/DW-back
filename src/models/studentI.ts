import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface StudentI {
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
  allergies?: string[];
  emergencyContact?: { name: string; phone: string; relationship: string };
  createdAt?: Date;
  updatedAt?: Date;
}

export class Student extends Model implements StudentI {
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
  public status?: "ACTIVO" | "INACTIVO" | "GRADUADO";
  public allergies?: string[];
  public emergencyContact?: { name: string; phone: string; relationship: string };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El apellido no puede estar vacío" },
      },
    },
    document: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    guardian: {
      type: DataTypes.STRING, // 👉 Podría cambiarse a guardianId si luego se asocia con Guardian
      allowNull: false,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: { args: [7, 15], msg: "El teléfono debe tener entre 7 y 15 caracteres" },
      },
    },
    guardianPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { msg: "Debe ser un correo válido" },
      },
    },
    status: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO", "GRADUADO"),
      defaultValue: "ACTIVO",
    },
    allergies: {
      type: DataTypes.JSON, // 👉 Guardamos array de strings
      allowNull: true,
    },
    emergencyContact: {
      type: DataTypes.JSON, // 👉 Guardamos objeto { name, phone, relationship }
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "students",
    timestamps: true, // Sequelize crea createdAt y updatedAt
  }
);
