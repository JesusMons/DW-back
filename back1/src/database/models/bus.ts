import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";
import { Driver } from "./driver"; // Para relaciones Bus ↔ Driver


export type BusStatus = "ACTIVO" | "INACTIVO";


export interface BusI {
id?: number;
plate: string;
capacity: number;
mileage: number;
model?: string | null;
brand?: string | null;
year?: number | null;
color?: string | null;
status?: BusStatus;
insuranceExpiry?: Date | null;
lastMaintenance?: Date | null;
nextMaintenance?: Date | null;
}


export class Bus extends Model implements BusI {
public id!: number;
public plate!: string;
public capacity!: number;
public mileage!: number;
public model?: string | null;
public brand?: string | null;
public year?: number | null;
public color?: string | null;
public status?: BusStatus;
public insuranceExpiry?: Date | null;
public lastMaintenance?: Date | null;
public nextMaintenance?: Date | null;
}


Bus.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
plate: { type: DataTypes.STRING(16), allowNull: false, unique: true },
capacity: { type: DataTypes.INTEGER, allowNull: false },
mileage: { type: DataTypes.INTEGER, allowNull: false },
model: { type: DataTypes.STRING(50), allowNull: true },
brand: { type: DataTypes.STRING(50), allowNull: true },
year: { type: DataTypes.SMALLINT, allowNull: true },
color: { type: DataTypes.STRING(30), allowNull: true },
status: { type: DataTypes.ENUM("ACTIVO", "INACTIVO"), allowNull: false, defaultValue: "ACTIVO" },
insuranceExpiry: { field: "insurance_expiry", type: DataTypes.DATEONLY, allowNull: true },
lastMaintenance: { field: "last_maintenance", type: DataTypes.DATEONLY, allowNull: true },
nextMaintenance: { field: "next_maintenance", type: DataTypes.DATEONLY, allowNull: true },
},
{ sequelize, modelName: "Bus", tableName: "buses", timestamps: true, underscored: true }
);


// Relaciones definidas aquí para evitar ciclos (solo Bus ↔ Driver)
Bus.hasMany(Driver, { as: "driversAssigned", foreignKey: "assignedBusId", sourceKey: "id" });
Driver.belongsTo(Bus, { as: "assignedBus", foreignKey: "assignedBusId", targetKey: "id" });
