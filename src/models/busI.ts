import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Driver } from "./driverI";
import { Route } from "./RouteI";
import { Assistance } from "./assistanceI";
import { Incidence } from "./incidenceI";
import { Itinerary } from "./ItineraryI";
import { Maintenance } from "./maintenanceI";
import { RouteAssignment } from "./route_assignment";

export interface busI {
  id?: number;
  plate: string;
  capacity: number;
  mileage: number;
  model?: string;
  brand?: string;
  year?: number;
  color?: string;
  status?: "ACTIVO" | "INACTIVO" | "EN MANTENIMIENTO";
  insuranceExpiry?: Date;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Bus extends Model implements busI {
  public id!: number;
  public plate!: string;
  public capacity!: number;
  public mileage!: number;
  public model?: string;
  public brand?: string;
  public year?: number;
  public color?: string;
  public status!: "ACTIVO" | "INACTIVO" | "EN MANTENIMIENTO";
  public insuranceExpiry?: Date;
  public lastMaintenance?: Date;
  public nextMaintenance?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bus.init(
  {
    plate: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    mileage: { type: DataTypes.INTEGER, allowNull: false },
    model: DataTypes.STRING(50),
    brand: DataTypes.STRING(50),
    year: DataTypes.INTEGER,
    color: DataTypes.STRING(30),
    status: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO", "EN MANTENIMIENTO"),
      defaultValue: "ACTIVO",
    },
    insuranceExpiry: DataTypes.DATEONLY,
    lastMaintenance: DataTypes.DATEONLY,
    nextMaintenance: DataTypes.DATEONLY,
  },
  {
    sequelize,
    modelName: "Bus",
    tableName: "buses",
    timestamps: true,
    indexes: [{ unique: true, fields: ["plate"] }],
  }
);

// Asociaciones
Bus.hasMany(Driver, { foreignKey: "assignedBusId", sourceKey: "id", as: "drivers" });
Driver.belongsTo(Bus, { foreignKey: "assignedBusId", targetKey: "id", as: "assigned_bus" });

Bus.hasMany(Route, { foreignKey: "busId", sourceKey: "id", as: "routes" });
Route.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });

Bus.hasMany(Assistance, { foreignKey: "bus_id", sourceKey: "id" });
Assistance.belongsTo(Bus, { foreignKey: "bus_id", targetKey: "id" });

Bus.hasMany(Incidence, { foreignKey: "busId", sourceKey: "id" });
Incidence.belongsTo(Bus, { foreignKey: "busId", targetKey: "id" });

Bus.hasMany(Itinerary, { foreignKey: "busId", sourceKey: "id", as: "itineraries" });
Itinerary.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });

Bus.hasMany(Maintenance, { foreignKey: "busId", sourceKey: "id", as: "maintenances" });
Maintenance.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });

Bus.hasMany(RouteAssignment, { foreignKey: "busId", sourceKey: "id", as: "assignments" });
RouteAssignment.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
