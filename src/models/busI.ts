import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface BusI {
  id?: number;
  plate: string;
  capacity: number;
  mileage: number;
  model?: string;
  brand?: string;
  year?: number;
  color?: string;
  status?: "ACTIVO" | "INACTIVO" | "EN MANTENIMIENTO";
  insuranceExpiry?: Date;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Bus extends Model implements BusI {
  public id!: number;
  public plate!: string;
  public capacity!: number;
  public mileage!: number;
  public model?: string;
  public brand?: string;
  public year?: number;
  public color?: string;
  public status?: "ACTIVO" | "INACTIVO" | "EN MANTENIMIENTO";
  public insuranceExpiry?: Date;
  public lastMaintenance?: Date;
  public nextMaintenance?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bus.init(
  {
    plate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "La placa no puede estar vacía" },
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: "La capacidad debe ser al menos 1" },
      },
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: { args: [1900], msg: "El año debe ser mayor a 1900" },
        max: { args: [new Date().getFullYear() + 1], msg: "El año no puede ser futuro" },
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO", "EN MANTENIMIENTO"),
      defaultValue: "ACTIVO",
    },
    insuranceExpiry: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    lastMaintenance: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nextMaintenance: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Bus",
    tableName: "buses",
    timestamps: true, // createdAt y updatedAt automáticos
  }
);
