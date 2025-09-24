import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface StopI {
  id?: number;
  name: string;
  direction: string;
  order?: number;
  landmark?: string;
  status?: "ACTIVA" | "INACTIVA";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Stop extends Model implements StopI {
  public id!: number;
  public name!: string;
  public direction!: string;
  public order?: number;
  public landmark?: string;
  public status?: "ACTIVA" | "INACTIVA";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Stop.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre de la parada no puede estar vacío" },
      },
    },
    direction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: { args: [1], msg: "El orden debe ser mayor a 0" },
      },
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true, // ejemplo: "Cerca del parque central"
    },
    status: {
      type: DataTypes.ENUM("ACTIVA", "INACTIVA"),
      defaultValue: "ACTIVA",
    },
  },
  {
    sequelize,
    modelName: "Stop",
    tableName: "stops",
    timestamps: true, // Sequelize crea createdAt y updatedAt
  }
);
