import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface AssistanceI {
  id?: number;
  studentId: number;   // referencia a studentI
  routeId: number;     // referencia a RouteI
  busId: number;       // referencia a busI
  date: Date;          // día de la asistencia
  time: string;        // hora de confirmación
  status: "CONFIRMADO" | "AUSENTE" | "CANCELADO";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Assistance extends Model implements AssistanceI {
  public id!: number;
  public studentId!: number;
  public routeId!: number;
  public busId!: number;
  public date!: Date;
  public time!: string;
  public status!: "CONFIRMADO" | "AUSENTE" | "CANCELADO";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Assistance.init(
  {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La hora no puede estar vacía" },
      },
    },
    status: {
      type: DataTypes.ENUM("CONFIRMADO", "AUSENTE", "CANCELADO"),
      defaultValue: "CONFIRMADO",
    },
  },
  {
    sequelize,
    modelName: "Assistance",
    tableName: "assistances",
    timestamps: true, // createdAt y updatedAt
  }
);
