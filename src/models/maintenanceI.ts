import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface MaintenanceI {
  id?: number;
  busId: number; // referencia a busI
  type: "PREVENTIVO" | "CORRECTIVO" | "INSPECCION";
  description: string;
  cost?: number;
  performedAt: Date;
  nextDueDate?: Date;
  status: "PENDIENTE" | "EN PROGRESO" | "COMPLETADO";
  mechanic?: string;
  odometer?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Maintenance extends Model implements MaintenanceI {
  public id!: number;
  public busId!: number;
  public type!: "PREVENTIVO" | "CORRECTIVO" | "INSPECCION";
  public description!: string;
  public cost?: number;
  public performedAt!: Date;
  public nextDueDate?: Date;
  public status!: "PENDIENTE" | "EN PROGRESO" | "COMPLETADO";
  public mechanic?: string;
  public odometer?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Maintenance.init(
  {
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("PREVENTIVO", "CORRECTIVO", "INSPECCION"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La descripción no puede estar vacía" },
      },
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: { args: [0], msg: "El costo no puede ser negativo" },
      },
    },
    performedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nextDueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDIENTE", "EN PROGRESO", "COMPLETADO"),
      defaultValue: "PENDIENTE",
    },
    mechanic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    odometer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: { args: [0], msg: "El odómetro no puede ser negativo" },
      },
    },
  },
  {
    sequelize,
    modelName: "Maintenance",
    tableName: "maintenances",
    timestamps: true, // Sequelize maneja createdAt y updatedAt
  }
);
