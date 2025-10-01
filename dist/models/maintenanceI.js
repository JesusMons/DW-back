"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maintenance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const busI_1 = require("./busI");
class Maintenance extends sequelize_1.Model {
}
exports.Maintenance = Maintenance;
Maintenance.init({
    busId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "buses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        field: "bus_id",
    },
    type: { type: sequelize_1.DataTypes.ENUM("PREVENTIVO", "CORRECTIVO", "INSPECCION"), allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    cost: sequelize_1.DataTypes.DECIMAL(12, 2),
    performedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    nextDueDate: sequelize_1.DataTypes.DATEONLY,
    status: {
        type: sequelize_1.DataTypes.ENUM("PENDIENTE", "EN PROGRESO", "COMPLETADO"),
        defaultValue: "PENDIENTE",
    },
    mechanic: sequelize_1.DataTypes.STRING(120),
    odometer: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: db_1.default,
    modelName: "Maintenance",
    tableName: "maintenances",
    timestamps: true,
    indexes: [
        { fields: ["bus_id"] },
        { fields: ["status"] },
        { fields: ["performedAt"] },
    ],
});
// Asociaciones
Maintenance.belongsTo(busI_1.Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
//# sourceMappingURL=maintenanceI.js.map