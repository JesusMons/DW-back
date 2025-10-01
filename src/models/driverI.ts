import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Bus } from "./busI";
import { RouteAssignment } from "./route_assignment";

export interface driverI {
  id?: number;
  name: string;
  document?: number | string;
  phone?: string;
  email?: string;
  address?: string;
  type_licence: string;
  licenceExpiry?: Date;
  experienceYears?: number;
  status?: "ACTIVO" | "INACTIVO" | "SUSPENDIDO";
  assignedBusId?: number | null;
  photoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Driver extends Model implements driverI {
  public id!: number;
  public name!: string;
  public document?: number | string;
  public phone?: string;
  public email?: string;
  public address?: string;
  public type_licence!: string;
  public licenceExpiry?: Date;
  public experienceYears?: number;
  public status!: "ACTIVO" | "INACTIVO" | "SUSPENDIDO";
  public assignedBusId?: number | null;
  public photoUrl?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Driver.init(
  {
    name: { type: DataTypes.STRING(120), allowNull: false },
    document: DataTypes.STRING(50),
    phone: DataTypes.STRING(30),
    email: { type: DataTypes.STRING(120), validate: { isEmail: true } },
    address: DataTypes.STRING(200),
    type_licence: { type: DataTypes.STRING(50), allowNull: false },
    licenceExpiry: DataTypes.DATEONLY,
    experienceYears: DataTypes.INTEGER,
    status: { type: DataTypes.ENUM("ACTIVO", "INACTIVO", "SUSPENDIDO"), defaultValue: "ACTIVO" },
    assignedBusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "buses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      field: "assigned_bus_id",
    },
    photoUrl: DataTypes.STRING(500),
  },
  { sequelize, modelName: "Driver", tableName: "drivers", timestamps: true }
);

// Asociaciones
Driver.belongsTo(Bus, { foreignKey: "assignedBusId", targetKey: "id", as: "assigned_bus" });
Driver.hasMany(RouteAssignment, { foreignKey: "driverId", sourceKey: "id", as: "assignments" });
RouteAssignment.belongsTo(Driver, { foreignKey: "driverId", targetKey: "id", as: "driver" });
