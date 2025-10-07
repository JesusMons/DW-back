"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maintenance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const bus_1 = require("./bus");
class Maintenance extends sequelize_1.Model {
}
exports.Maintenance = Maintenance;
Maintenance.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    busId: { field: "bus_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    type: { type: sequelize_1.DataTypes.ENUM("PREVENTIVO", "CORRECTIVO", "INSPECCION"), allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
    cost: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: true },
    performedAt: { field: "performed_at", type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    nextDueDate: { field: "next_due_date", type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM("PENDIENTE", "EN PROGRESO", "COMPLETADO"), allowNull: false, defaultValue: "PENDIENTE" },
    mechanic: { type: sequelize_1.DataTypes.STRING(120), allowNull: true },
    odometer: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
}, { sequelize: db_1.default, modelName: "Maintenance", tableName: "maintenances", timestamps: true, underscored: true });
Maintenance.belongsTo(bus_1.Bus, { foreignKey: "busId" });
bus_1.Bus.hasMany(Maintenance, { foreignKey: "busId" });
//# sourceMappingURL=maintenance.js.map