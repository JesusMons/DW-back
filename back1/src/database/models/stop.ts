import { DataTypes, Model } from "sequelize";
import  sequelize  from "../db";


export type StopStatus = "ACTIVA" | "INACTIVA";


export interface StopI {
id?: number;
name: string;
direction: string;
orderHint?: number | null;
landmark?: string | null;
status?: StopStatus;
}


export class Stop extends Model implements StopI {
public id!: number;
public name!: string;
public direction!: string;
public orderHint?: number | null;
public landmark?: string | null;
public status?: StopStatus;
}


Stop.init(
{
id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
name: { type: DataTypes.STRING(120), allowNull: false },
direction: { type: DataTypes.STRING(190), allowNull: false },
orderHint: { field: "order_hint", type: DataTypes.INTEGER, allowNull: true },
landmark: { type: DataTypes.STRING(190), allowNull: true },
status: { type: DataTypes.ENUM("ACTIVA", "INACTIVA"), allowNull: false, defaultValue: "ACTIVA" },
},
{ sequelize, modelName: "Stop", tableName: "stops", timestamps: true, underscored: true }
);