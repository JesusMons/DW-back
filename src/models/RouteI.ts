import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface RouteI {
  id?: number;
  name: string;
  stops: string[];
  startPoint: string;
  endPoint: string;
  schedule: string[];
  bus: number;
  driver: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Route extends Model implements RouteI {
  public id!: number;
  public name!: string;
  public stops!: string[];
  public startPoint!: string;
  public endPoint!: string;
  public schedule!: string[];
  public bus!: number;
  public driver!: string;
  public status!: "ACTIVE" | "INACTIVE";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Route.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "El nombre de la ruta no puede estar vacío" },
      },
    },
    stops: {
      type: DataTypes.JSON, // Guardamos array de paradas
      allowNull: false,
      validate: {
        notEmpty: { msg: "Debe contener al menos una parada" },
      },
    },
    startPoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endPoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.JSON, // Guardamos array de horarios
      allowNull: false,
    },
    bus: {
      type: DataTypes.INTEGER, // Relación con Bus
      allowNull: false,
    },
    driver: {
      type: DataTypes.STRING, // Nombre del conductor (puede reemplazarse con FK en asociaciones)
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Route",
    tableName: "routes",
    timestamps: true, // createdAt y updatedAt automáticos
  }
);
