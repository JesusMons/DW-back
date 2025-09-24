import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface RouteAssignmentI {
  id?: number;
  routeId: number;   // referencia a RouteI
  busId: number;     // referencia a busI
  driverId?: number; // referencia opcional a driverI
  startDate: Date;
  endDate?: Date;
  status: "ACTIVO" | "INACTIVO";
  createdAt?: Date;
  updatedAt?: Date;
}

export class RouteAssignment extends Model implements RouteAssignmentI {
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
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      defaultValue: "ACTIVO",
    },
  },
  {
    sequelize,
    modelName: "RouteAssignment",
    tableName: "route_assignments",
    timestamps: true, // Sequelize crea createdAt y updatedAt
  }
);
