import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Student } from "./studentI";
import { Route } from "./RouteI";
import { Bus } from "./busI";

export interface AssistanceI {
  id?: number;
  student_id: number;
  route_id: number;
  bus_id: number;
  date: Date;
  time: string; // HH:mm o HH:mm:ss
  status: "CONFIRMADO" | "AUSENTE" | "CANCELADO";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Assistance extends Model implements AssistanceI {
  public id!: number;
  public student_id!: number;
  public route_id!: number;
  public bus_id!: number;
  public date!: Date;
  public time!: string;
  public status!: "CONFIRMADO" | "AUSENTE" | "CANCELADO";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Assistance.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "students", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "routes", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "buses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La hora no puede estar vacía" },
        is: {
          args: /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/,
          msg: "Formato de hora inválido. Usa HH:mm o HH:mm:ss",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("CONFIRMADO", "AUSENTE", "CANCELADO"),
      defaultValue: "CONFIRMADO",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Assistance",
    tableName: "assistances",
    timestamps: true,
    indexes: [
      { fields: ["student_id"] },
      { fields: ["route_id"] },
      { fields: ["bus_id"] },
      { fields: ["date"] },
      { unique: true, fields: ["student_id", "route_id", "date", "time"], name: "uniq_student_route_date_time" },
    ],
  }
);

// Asociaciones
Student.hasMany(Assistance, { foreignKey: "student_id", sourceKey: "id" });
Assistance.belongsTo(Student, { foreignKey: "student_id", targetKey: "id" });

Route.hasMany(Assistance, { foreignKey: "route_id", sourceKey: "id" });
Assistance.belongsTo(Route, { foreignKey: "route_id", targetKey: "id" });

Bus.hasMany(Assistance, { foreignKey: "bus_id", sourceKey: "id" });
Assistance.belongsTo(Bus, { foreignKey: "bus_id", targetKey: "id" });
