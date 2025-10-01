import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Bus } from "./busI";

export interface maintenanceI {
  id?: number;
  busId: number;
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

export class Maintenance extends Model implements maintenanceI {
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
      references: { model: "buses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      field: "bus_id",
    },
    type: { type: DataTypes.ENUM("PREVENTIVO", "CORRECTIVO", "INSPECCION"), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    cost: DataTypes.DECIMAL(12, 2),
    performedAt: { type: DataTypes.DATE, allowNull: false },
    nextDueDate: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM("PENDIENTE", "EN PROGRESO", "COMPLETADO"),
      defaultValue: "PENDIENTE",
    },
    mechanic: DataTypes.STRING(120),
    odometer: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Maintenance",
    tableName: "maintenances",
    timestamps: true,
    indexes: [
      { fields: ["bus_id"] },
      { fields: ["status"] },
      { fields: ["performedAt"] },
    ],
  }
);

// Asociaciones
Maintenance.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
