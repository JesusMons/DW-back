import { Model, DataTypes } from "sequelize";
import sequelize  from "../../db";
export class Resource extends Model {
  public id!: number;
  public path!: string;
  public method!: string;
  public status!: "ACTIVO" | "INACTIVO";
}

export interface ResourceI {
  id?: number;
  path: string;
  method: string;
  status: "ACTIVO" | "INACTIVO";
}

Resource.init(
  {
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Path cannot be empty" },
      },
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Method cannot be empty" },
      },
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "ACTIVO",
      validate: { isIn: [["ACTIVO", "INACTIVO"]] },
    },
  },
  {
    tableName: "resources",
    sequelize: sequelize,
    timestamps: false,
  }
);
