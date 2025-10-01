import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

export interface stopI {
  id?: number;
  name: string;
  direction: string;
  order?: number;
  landmark?: string;
  status?: "ACTIVA" | "INACTIVA";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Stop extends Model implements stopI {
  public id!: number;
  public name!: string;
  public direction!: string;
  public order?: number;
  public landmark?: string;
  public status!: "ACTIVA" | "INACTIVA";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Stop.init(
  {
    name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    direction: { type: DataTypes.STRING(200), allowNull: false },
    order: DataTypes.INTEGER,
    landmark: DataTypes.STRING(200),
    status: { type: DataTypes.ENUM("ACTIVA", "INACTIVA"), defaultValue: "ACTIVA" },
  },
  { sequelize, modelName: "Stop", tableName: "stops", timestamps: true }
);

// (Sin FKs físicas en tu diseño actual)
