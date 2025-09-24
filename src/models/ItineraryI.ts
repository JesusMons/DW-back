import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface ItineraryI {
  id?: number;
  routeId: number; // Relación con RouteI
  date: Date;
  departureTime: string;
  arrivalTime: string;
  stopsSchedule: { stop: string; time: string }[];
  driver: string;
  bus: number;
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
  public bus!: number;
  public status!: "PLANEADO" | "EN PROGRESO" | "COMPLETADO" | "CANCELADO";
  public notes?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Itinerary.init(
  {
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La hora de salida no puede estar vacía" },
      },
    },
    arrivalTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La hora de llegada no puede estar vacía" },
      },
    },
    stopsSchedule: {
      type: DataTypes.JSON, // Guardamos un array [{ stop, time }]
      allowNull: false,
      validate: {
        notEmpty: { msg: "Debe tener al menos una parada" },
      },
    },
    driver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PLANEADO", "EN PROGRESO", "COMPLETADO", "CANCELADO"),
      defaultValue: "PLANEADO",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Itinerary",
    tableName: "itineraries",
    timestamps: true, // Sequelize genera createdAt y updatedAt
  }
);
