import { Model, DataTypes } from "sequelize";
import  sequelize  from "../../db";

export class RoleUser extends Model {
  public id!: number;
  public role_id!: number;
  public user_id!: number;
  public status!: "ACTIVO" | "INACTIVO";
}

export interface RoleUserI {
    id?: number;
    role_id: number;
    user_id: number;
    status: "ACTIVO" | "INACTIVO";
  }
  
RoleUser.init(
  {
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "ACTIVO",
      validate: { isIn: [["ACTIVO", "INACTIVO"]] },
    }
  },
  {
    tableName: "role_users",
    sequelize: sequelize,
    timestamps: false
  }
);
