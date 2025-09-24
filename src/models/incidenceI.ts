import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface IncidenceI {
  id?: number;
  busId: number;      // referencia a Bus
  routeId: number;    // referencia a Route
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

export class Incidence extends Model implements IncidenceI {
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
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La descripción no puede estar vacía" },
      },
    },
    severity: {
      type: DataTypes.ENUM("BAJA", "MEDIA", "ALTA", "CRITICA"),
      allowNull: false,
      defaultValue: "BAJA",
    },
    status: {
      type: DataTypes.ENUM("ABIERTA", "EN PROGRESO", "RESUELTO", "CERRADO"),
      allowNull: false,
      defaultValue: "ABIERTA",
    },
    reportedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    resolvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reportedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actionsTaken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Incidence",
    tableName: "incidences",
    timestamps: true, // createdAt y updatedAt automáticos
  }
);
