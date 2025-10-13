import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Bus } from "./bus";
import { Route } from "./route";


export type IncidenceSeverity = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
export type IncidenceStatus = "ACTIVO" | "INACTIVO";


export interface IncidenceI {
id?: number;
busId: number;
routeId: number;
description: string;
severity: IncidenceSeverity;
status?: IncidenceStatus;
reportedAt: Date; // DATETIME
resolvedAt?: Date | null; // DATETIME
reportedBy: string;
actionsTaken?: string | null;
}


export class Incidence extends Model implements IncidenceI {
public id!: number;
public busId!: number;
public routeId!: number;
public description!: string;
public severity!: IncidenceSeverity;
public status?: IncidenceStatus;
public reportedAt!: Date;
public resolvedAt?: Date | null;
public reportedBy!: string;
public actionsTaken?: string | null;
}


Incidence.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
busId: { field: "bus_id", type: DataTypes.BIGINT, allowNull: false },
routeId: { field: "route_id", type: DataTypes.BIGINT, allowNull: false },
description: { type: DataTypes.STRING(600), allowNull: false },
severity: {
  type: DataTypes.STRING(20),
  allowNull: false,
  validate: { isIn: [["BAJA", "MEDIA", "ALTA", "CRITICA"]] },
},
status: {
  type: DataTypes.STRING(20),
  allowNull: false,
  defaultValue: "ACTIVO",
  validate: { isIn: [["ACTIVO", "INACTIVO"]] },
},
reportedAt: { field: "reported_at", type: DataTypes.DATE, allowNull: false },
resolvedAt: { field: "resolved_at", type: DataTypes.DATE, allowNull: true },
reportedBy: { field: "reported_by", type: DataTypes.STRING(120), allowNull: false },
actionsTaken: { field: "actions_taken", type: DataTypes.STRING(600), allowNull: true },
},
{ sequelize, modelName: "Incidence", tableName: "incidences", timestamps: true, underscored: true }
);


Incidence.belongsTo(Bus, { foreignKey: "busId" });
Incidence.belongsTo(Route, { foreignKey: "routeId" });
Bus.hasMany(Incidence, { foreignKey: "busId" });
Route.hasMany(Incidence, { foreignKey: "routeId" });
