import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface DriverI {
  id?: number;
  name: string;
  document?: number | string;
  phone?: string;
  email?: string;
  address?: string;
  type_licence: string;
  licenceExpiry?: Date;
  experienceYears?: number;
  status?: "ACTIVO" | "INACTIVO" | "SUSPENDIDO";
  assignedBusId?: number;
  photoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Driver extends Model implements DriverI {
  public id!: number;
  public name!: string;
  public document?: number | string;
  public phone?: string;
  public email?: string;
  public address?: string;
  public type_licence!: string;
  public licenceExpiry?: Date;
  public experienceYears?: number;
  public status?: "ACTIVO" | "INACTIVO" | "SUSPENDIDO";
  public assignedBusId?: number;
  public photoUrl?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Driver.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" },
      },
    },
    document: {
      type: DataTypes.STRING, // usamos STRING para soportar números grandes y alfanuméricos
      allowNull: true,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: { args: [7, 15], msg: "El teléfono debe tener entre 7 y 15 caracteres" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { msg: "Debe ser un correo válido" },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type_licence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    licenceExpiry: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: { args: [0], msg: "La experiencia no puede ser negativa" },
      },
    },
    status: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO", "SUSPENDIDO"),
      defaultValue: "ACTIVO",
    },
    assignedBusId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Relación con Bus
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: { msg: "La foto debe ser una URL válida" },
      },
    },
  },
  {
    sequelize,
    modelName: "Driver",
    tableName: "drivers",
    timestamps: true, // Sequelize genera createdAt y updatedAt
  }
);
