import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Route } from "./RouteI";
import { Bus } from "./busI";
import { Driver } from "./driverI";

export interface route_assignment {
  id?: number;
  routeId: number;
  busId: number;
  driverId?: number;
  startDate: Date;
  endDate?: Date;
  status: "ACTIVO" | "INACTIVO";
  createdAt?: Date;
  updatedAt?: Date;
}

export class RouteAssignment extends Model implements route_assignment {
  public id!: number;
  public routeId!: number;
  public busId!: number;
  public driverId?: number;
  public startDate!: Date;
  public endDate?: Date;
  public status!: "ACTIVO" | "INACTIVO";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RouteAssignment.init(
  {
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "routes", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      field: "route_id",
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "buses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      field: "bus_id",
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "drivers", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      field: "driver_id",
    },
    startDate: { type: DataTypes.DATEONLY, allowNull: false },
    endDate: DataTypes.DATEONLY,
    status: { type: DataTypes.ENUM("ACTIVO", "INACTIVO"), defaultValue: "ACTIVO" },
  },
  {
    sequelize,
    modelName: "RouteAssignment",
    tableName: "route_assignments",
    timestamps: true,
    indexes: [
      { fields: ["route_id"] },
      { fields: ["bus_id"] },
      { fields: ["driver_id"] },
      { fields: ["status"] },
    ],
  }
);

// Asociaciones
RouteAssignment.belongsTo(Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
RouteAssignment.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
RouteAssignment.belongsTo(Driver, { foreignKey: "driverId", targetKey: "id", as: "driver" });

Route.hasMany(RouteAssignment, { foreignKey: "routeId", sourceKey: "id", as: "assignments" });
Bus.hasMany(RouteAssignment, { foreignKey: "busId", sourceKey: "id", as: "assignments" });
Driver.hasMany(RouteAssignment, { foreignKey: "driverId", sourceKey: "id", as: "assignments" });
