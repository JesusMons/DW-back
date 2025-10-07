"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteAssignment = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const route_1 = require("./route");
const bus_1 = require("./bus");
const driver_1 = require("./driver");
class RouteAssignment extends sequelize_1.Model {
}
exports.RouteAssignment = RouteAssignment;
RouteAssignment.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    routeId: { field: "route_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    busId: { field: "bus_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    driverId: { field: "driver_id", type: sequelize_1.DataTypes.BIGINT, allowNull: true },
    startDate: { field: "start_date", type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    endDate: { field: "end_date", type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"), allowNull: false, defaultValue: "ACTIVO" },
}, { sequelize: db_1.default, modelName: "RouteAssignment", tableName: "route_assignments", timestamps: true, underscored: true });
// Relaciones históricas
RouteAssignment.belongsTo(route_1.Route, { foreignKey: "routeId" });
RouteAssignment.belongsTo(bus_1.Bus, { foreignKey: "busId" });
RouteAssignment.belongsTo(driver_1.Driver, { foreignKey: "driverId" });
route_1.Route.hasMany(RouteAssignment, { foreignKey: "routeId", as: "assignments" });
bus_1.Bus.hasMany(RouteAssignment, { foreignKey: "busId", as: "assignments" });
driver_1.Driver.hasMany(RouteAssignment, { foreignKey: "driverId", as: "assignments" });
//# sourceMappingURL=routeAssignment.js.map