"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const driver_1 = require("./driver"); // Para relaciones Bus ↔ Driver
class Bus extends sequelize_1.Model {
}
exports.Bus = Bus;
Bus.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    plate: { type: sequelize_1.DataTypes.STRING(16), allowNull: false, unique: true },
    capacity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    mileage: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    model: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    brand: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    year: { type: sequelize_1.DataTypes.SMALLINT, allowNull: true },
    color: { type: sequelize_1.DataTypes.STRING(30), allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO", "EN MANTENIMIENTO"), allowNull: false, defaultValue: "ACTIVO" },
    insuranceExpiry: { field: "insurance_expiry", type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
    lastMaintenance: { field: "last_maintenance", type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
    nextMaintenance: { field: "next_maintenance", type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
}, { sequelize: db_1.default, modelName: "Bus", tableName: "buses", timestamps: true, underscored: true });
// Relaciones definidas aquí para evitar ciclos (solo Bus ↔ Driver)
Bus.hasMany(driver_1.Driver, { as: "driversAssigned", foreignKey: "assignedBusId", sourceKey: "id" });
driver_1.Driver.belongsTo(Bus, { as: "assignedBus", foreignKey: "assignedBusId", targetKey: "id" });
//# sourceMappingURL=bus.js.map