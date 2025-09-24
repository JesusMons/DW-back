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
  time: string;
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
    timestamps: true,
  }
);

// 🔗 Relaciones
Student.hasMany(Assistance, {
  foreignKey: "student_id",
  sourceKey: "id",
});

Assistance.belongsTo(Student, {
  foreignKey: "student_id",
  targetKey: "id",
});

Route.hasMany(Assistance, {
  foreignKey: "route_id",
  sourceKey: "id",
});

Assistance.belongsTo(Route, {
  foreignKey: "route_id",
  targetKey: "id",
});

Bus.hasMany(Assistance, {
  foreignKey: "bus_id",
  sourceKey: "id",
});

Assistance.belongsTo(Bus, {
  foreignKey: "bus_id",
  targetKey: "id",
});
