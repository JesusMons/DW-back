"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStop = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const route_1 = require("./route");
const stop_1 = require("./stop");
class RouteStop extends sequelize_1.Model {
}
exports.RouteStop = RouteStop;
RouteStop.init({
    routeId: { field: "route_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false, primaryKey: true },
    stopId: { field: "stop_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false, primaryKey: true },
    position: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    scheduledTimeHint: { field: "scheduled_time_hint", type: sequelize_1.DataTypes.TIME, allowNull: true },
}, { sequelize: db_1.default, modelName: "RouteStop", tableName: "route_stops", timestamps: false, underscored: true });
// m:n Route ↔ Stop (más acceso a filas puente)
route_1.Route.belongsToMany(stop_1.Stop, { through: RouteStop, foreignKey: "routeId", otherKey: "stopId", as: "stops" });
stop_1.Stop.belongsToMany(route_1.Route, { through: RouteStop, foreignKey: "stopId", otherKey: "routeId", as: "routes" });
route_1.Route.hasMany(RouteStop, { foreignKey: "routeId", as: "routeStops" });
stop_1.Stop.hasMany(RouteStop, { foreignKey: "stopId", as: "routeStops" });
RouteStop.belongsTo(route_1.Route, { foreignKey: "routeId" });
RouteStop.belongsTo(stop_1.Stop, { foreignKey: "stopId" });
//# sourceMappingURL=routeStop.js.map