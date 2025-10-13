import { Model, DataTypes } from "sequelize";
import  sequelize  from "../../db";
import { RoleUser } from "./RolUser";

export class Role extends Model {
  public id!: number;
  public name!: string;
  public status!: "ACTIVO" | "INACTIVO";
}

export interface RoleI {
    id?: number;
    name: string;
    status: "ACTIVO" | "INACTIVO";
  }

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "ACTIVO",
      validate: { isIn: [["ACTIVO", "INACTIVO"]] },
    }
  },
  {
    tableName: "roles",
    sequelize: sequelize,
    timestamps: false
  }
);


Role.hasMany(RoleUser, {
  foreignKey: 'role_id',
  sourceKey: "id",
});
RoleUser.belongsTo(Role, {
  foreignKey: 'role_id',
  targetKey: "id",
});
