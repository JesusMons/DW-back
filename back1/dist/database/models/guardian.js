"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guardian = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const student_1 = require("./student"); // define Guardian ↔ Student aquí
class Guardian extends sequelize_1.Model {
}
exports.Guardian = Guardian;
Guardian.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    firstName: { field: "first_name", type: sequelize_1.DataTypes.STRING(80), allowNull: false },
    lastName: { field: "last_name", type: sequelize_1.DataTypes.STRING(80), allowNull: false },
    document: { type: sequelize_1.DataTypes.STRING(32), allowNull: false, unique: true },
    phone: { type: sequelize_1.DataTypes.STRING(30), allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING(190), allowNull: true, validate: { isEmail: true } },
    relationship: { type: sequelize_1.DataTypes.STRING(60), allowNull: false },
    address: { type: sequelize_1.DataTypes.STRING(190), allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"), allowNull: false, defaultValue: "ACTIVO" },
}, { sequelize: db_1.default, modelName: "Guardian", tableName: "guardians", timestamps: true, underscored: true });
Guardian.hasMany(student_1.Student, { foreignKey: "guardianId", sourceKey: "id" });
student_1.Student.belongsTo(Guardian, { foreignKey: "guardianId", targetKey: "id" });
//# sourceMappingURL=guardian.js.map