import { Model, DataTypes } from "sequelize";
import sequelize  from "../../db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "./User";

export class RefreshToken extends Model {
  id!: number;
  public user_id!: number;
  public token!: string;
  public device_info!: string;
  public status!: "ACTIVO" | "INACTIVO";;
  public expires_at!: Date;
  public created_at!: Date;
  public updated_at!: Date;
  
}

export interface RefreshTokenI {
  user_id?: number;
  token: string;
  device_info: string;
  status: "ACTIVO" | "INACTIVO";
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
  
}

RefreshToken.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    device_info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      defaultValue: "ACTIVO",
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "refresh_tokens",
    sequelize: sequelize,
    timestamps: false,
    hooks: {
      beforeCreate: (refreshToken: RefreshToken) => {
        const currentDate = new Date();
        refreshToken.created_at = currentDate;
        refreshToken.updated_at = currentDate;
      },
      beforeUpdate: (refreshToken: RefreshToken) => {
        const currentDate = new Date();
        refreshToken.updated_at = currentDate;
      }
    }
  }
);

User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
  sourceKey: "id",
});
RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: "id",
});
