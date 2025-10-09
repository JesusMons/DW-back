"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incidence = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const bus_1 = require("./bus");
const route_1 = require("./route");
class Incidence extends sequelize_1.Model {
}
exports.Incidence = Incidence;
Incidence.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    busId: { field: "bus_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    routeId: { field: "route_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING(600), allowNull: false },
    severity: { type: sequelize_1.DataTypes.ENUM("BAJA", "MEDIA", "ALTA", "CRITICA"), allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"), allowNull: false, defaultValue: "ACTIVO" },
    reportedAt: { field: "reported_at", type: sequelize_1.DataTypes.DATE, allowNull: false },
    resolvedAt: { field: "resolved_at", type: sequelize_1.DataTypes.DATE, allowNull: true },
    reportedBy: { field: "reported_by", type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    actionsTaken: { field: "actions_taken", type: sequelize_1.DataTypes.STRING(600), allowNull: true },
}, { sequelize: db_1.default, modelName: "Incidence", tableName: "incidences", timestamps: true, underscored: true });
Incidence.belongsTo(bus_1.Bus, { foreignKey: "busId" });
Incidence.belongsTo(route_1.Route, { foreignKey: "routeId" });
bus_1.Bus.hasMany(Incidence, { foreignKey: "busId" });
route_1.Route.hasMany(Incidence, { foreignKey: "routeId" });
//# sourceMappingURL=incidence.js.map