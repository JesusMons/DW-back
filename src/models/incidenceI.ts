import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Bus } from "./busI";
import { Route } from "./RouteI";

export interface incidenceI {
  id?: number;
  busId: number;
  routeId: number;
  description: string;
  severity: "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
  status: "ABIERTA" | "EN PROGRESO" | "RESUELTO" | "CERRADO";
  reportedAt: Date;
  resolvedAt?: Date;
  reportedBy: string;
  actionsTaken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Incidence extends Model implements incidenceI {
  public id!: number;
  public busId!: number;
  public routeId!: number;
  public description!: string;
  public severity!: "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
  public status!: "ABIERTA" | "EN PROGRESO" | "RESUELTO" | "CERRADO";
  public reportedAt!: Date;
  public resolvedAt?: Date;
  public reportedBy!: string;
  public actionsTaken?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Incidence.init(
  {
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "buses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      field: "bus_id",
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "routes", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      field: "route_id",
    },
    description: { type: DataTypes.TEXT, allowNull: false },
    severity: { type: DataTypes.ENUM("BAJA", "MEDIA", "ALTA", "CRITICA"), allowNull: false },
    status: { type: DataTypes.ENUM("ABIERTA", "EN PROGRESO", "RESUELTO", "CERRADO"), defaultValue: "ABIERTA" },
    reportedAt: { type: DataTypes.DATE, allowNull: false },
    resolvedAt: DataTypes.DATE,
    reportedBy: { type: DataTypes.STRING(120), allowNull: false },
    actionsTaken: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Incidence",
    tableName: "incidences",
    timestamps: true,
    indexes: [
      { fields: ["bus_id"] },
      { fields: ["route_id"] },
      { fields: ["status"] },
      { fields: ["severity"] },
    ],
  }
);

// Asociaciones
Incidence.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
Incidence.belongsTo(Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
