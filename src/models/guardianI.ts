import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface GuardianI {
  id?: number;
  firstName: string;
  lastName: string;
  document: number;
  phone: string;
  email?: string;
  relationship: string;
  address?: string;
  students?: number[]; // relación con estudiantes
  status?: "ACTIVO" | "INACTIVO";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Guardian extends Model implements GuardianI {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public document!: number;
  public phone!: string;
  public email?: string;
  public relationship!: string;
  public address?: string;
  public students?: number[];
  public status?: "ACTIVO" | "INACTIVO";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Guardian.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El apellido no puede estar vacío" },
      },
    },
    document: {
      type: DataTypes.BIGINT, // permite cédulas largas
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [7, 15], msg: "El teléfono debe tener entre 7 y 15 caracteres" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { msg: "Debe ser un correo válido" },
      },
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      defaultValue: "ACTIVO",
    },
  },
  {
    sequelize,
    modelName: "Guardian",
    tableName: "guardians",
    timestamps: true, // crea createdAt y updatedAt
  }
);
