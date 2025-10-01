"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guardian = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class Guardian extends sequelize_1.Model {
}
exports.Guardian = Guardian;
Guardian.init({
    firstName: { type: sequelize_1.DataTypes.STRING(80), allowNull: false },
    lastName: { type: sequelize_1.DataTypes.STRING(80), allowNull: false },
    document: { type: sequelize_1.DataTypes.BIGINT, allowNull: false, unique: true },
    phone: { type: sequelize_1.DataTypes.STRING(30), allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING(120), validate: { isEmail: true } },
    relationship: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    address: sequelize_1.DataTypes.STRING(200),
    students: sequelize_1.DataTypes.JSON,
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"), defaultValue: "ACTIVO" },
}, { sequelize: db_1.default, modelName: "Guardian", tableName: "guardians", timestamps: true });
// (Sin FKs físicas en tu diseño actual)
//# sourceMappingURL=guardianI.js.map