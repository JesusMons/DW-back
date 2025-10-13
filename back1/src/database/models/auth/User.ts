import { Model, DataTypes } from "sequelize";
import sequelize from "../../db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RoleUser } from "./RolUser";

export class User extends Model {
  id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public status!: "ACTIVO" | "INACTIVO";
  public avatar!: string;

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }




  public generateToken(): string {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '20m',
    });
  }

  public generateRefreshToken(): { token: string, expiresAt: Date } {
    const expiresIn = '7d';
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn,
    });
    const expiresAt = new Date(Date.now() + 60 *  60 * 1000); // 7 días
    return { token, expiresAt };
  }
}


export interface UserI {
  id?: number;
  username: string;
  email: string;
  password: string;
  status: "ACTIVO" | "INACTIVO";
  avatar?: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "ACTIVO",
      validate: { isIn: [["ACTIVO", "INACTIVO"]] },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "users",
    sequelize: sequelize,
    timestamps: false,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
);

User.hasMany(RoleUser, {
  foreignKey: 'user_id',
  sourceKey: "id",
});
RoleUser.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: "id",
});
