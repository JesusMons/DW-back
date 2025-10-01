import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Route } from "./RouteI";
import { Bus } from "./busI";

export interface ItineraryI {
  id?: number;
  routeId: number;
  date: Date;
  departureTime: string;
  arrivalTime: string;
  stopsSchedule: { stop: string; time: string }[];
  driver: string;
  busId: number;
  status: "PLANEADO" | "EN PROGRESO" | "COMPLETADO" | "CANCELADO";
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Itinerary extends Model implements ItineraryI {
  public id!: number;
  public routeId!: number;
  public date!: Date;
  public departureTime!: string;
  public arrivalTime!: string;
  public stopsSchedule!: { stop: string; time: string }[];
  public driver!: string;
  public busId!: number;
  public status!: "PLANEADO" | "EN PROGRESO" | "COMPLETADO" | "CANCELADO";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Itinerary.init(
  {
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "routes", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      field: "route_id",
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    departureTime: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: { is: /^\d{2}:\d{2}$/ },
    },
    arrivalTime: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: { is: /^\d{2}:\d{2}$/ },
    },
    stopsSchedule: { type: DataTypes.JSON, allowNull: false },
    driver: { type: DataTypes.STRING(120), allowNull: false },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "buses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      field: "bus_id",
    },
    status: {
      type: DataTypes.ENUM("PLANEADO", "EN PROGRESO", "COMPLETADO", "CANCELADO"),
      defaultValue: "PLANEADO",
    },
    notes: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Itinerary",
    tableName: "itineraries",
    timestamps: true,
    indexes: [
      { fields: ["route_id"] },
      { fields: ["bus_id"] },
      { fields: ["status"] },
      { fields: ["date"] },
    ],
  }
);

// Asociaciones
Itinerary.belongsTo(Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
Itinerary.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
