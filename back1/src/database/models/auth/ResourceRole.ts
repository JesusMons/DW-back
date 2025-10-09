import { Model, DataTypes } from "sequelize";
import sequelize  from "../../db";
import { Resource } from "./Resource";
import { Role } from "./Rol";

export class ResourceRole extends Model {
  public id!: number;
  public resource_id!: number;
  public role_id!: number;
  public status!: "ACTIVO" | "INACTIVO";
}

export interface ResourceRoleI {
  id?: number;
  resource_id: number;
  role_id: number;
  status: "ACTIVO" | "INACTIVO";
}

ResourceRole.init(
  {
    status: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      defaultValue: "ACTIVO",
    },
  },
  {
    tableName: "resource_roles",
    sequelize: sequelize,
    timestamps: false,
  }
);

// Define relationships
Resource.hasMany(ResourceRole, {
  foreignKey: "resource_id",
  sourceKey: "id",
});
ResourceRole.belongsTo(Resource, {
  foreignKey: "resource_id",
  targetKey: "id",
});

Role.hasMany(ResourceRole, {
  foreignKey: "role_id",
  sourceKey: "id",
});
ResourceRole.belongsTo(Role, {
  foreignKey: "role_id",
  targetKey: "id",
});
