"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Driver extends sequelize_1.Model {
}
exports.Driver = Driver;
Driver.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    document: { type: sequelize_1.DataTypes.STRING(32), allowNull: true },
    phone: { type: sequelize_1.DataTypes.STRING(30), allowNull: true },
    email: { type: sequelize_1.DataTypes.STRING(190), allowNull: true, validate: { isEmail: true } },
    address: { type: sequelize_1.DataTypes.STRING(190), allowNull: true },
    typeLicence: { field: "type_licence", type: sequelize_1.DataTypes.STRING(32), allowNull: false },
    licenceExpiry: { field: "licence_expiry", type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
    experienceYears: { field: "experience_years", type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"), allowNull: false, defaultValue: "ACTIVO" },
    assignedBusId: { field: "assigned_bus_id", type: sequelize_1.DataTypes.BIGINT, allowNull: true },
    photoUrl: { field: "photo_url", type: sequelize_1.DataTypes.STRING(255), allowNull: true },
}, { sequelize: db_1.default, modelName: "Driver", tableName: "drivers", timestamps: true, underscored: true });
//# sourceMappingURL=driver.js.map