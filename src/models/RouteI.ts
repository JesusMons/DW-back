import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { Bus } from "./busI";
import { Assistance } from "./assistanceI";
import { Incidence } from "./incidenceI";
import { Itinerary } from "./ItineraryI";
import { RouteAssignment } from "./route_assignment";

export interface RouteI {
  id?: number;
  name: string;
  stops: string[];         // JSON
  startPoint: string;
  endPoint: string;
  schedule: string[];      // JSON
  busId: number;           // FK buses.id
  driver: string;          // string
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
  public busId!: number;
  public driver!: string;
  public status!: "ACTIVE" | "INACTIVE";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Route.init(
  {
    name: { type: DataTypes.STRING(120), allowNull: false },
    stops: { type: DataTypes.JSON, allowNull: false },
    startPoint: { type: DataTypes.STRING(200), allowNull: false },
    endPoint: { type: DataTypes.STRING(200), allowNull: false },
    schedule: { type: DataTypes.JSON, allowNull: false },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "buses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      field: "bus_id",
    },
    driver: { type: DataTypes.STRING(120), allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Route",
    tableName: "routes",
    timestamps: true,
    indexes: [{ fields: ["bus_id"] }, { fields: ["status"] }],
  }
);

// Asociaciones
Route.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });

Route.hasMany(Assistance, { foreignKey: "route_id", sourceKey: "id", as: "assistances" });
Assistance.belongsTo(Route, { foreignKey: "route_id", targetKey: "id", as: "route" });

Route.hasMany(Incidence, { foreignKey: "routeId", sourceKey: "id", as: "incidences" });
Incidence.belongsTo(Route, { foreignKey: "routeId", targetKey: "id", as: "route" });

Route.hasMany(Itinerary, { foreignKey: "routeId", sourceKey: "id", as: "itineraries" });
Itinerary.belongsTo(Route, { foreignKey: "routeId", targetKey: "id", as: "route" });

Route.hasMany(RouteAssignment, { foreignKey: "routeId", sourceKey: "id", as: "assignments" });
RouteAssignment.belongsTo(Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
