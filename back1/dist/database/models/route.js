"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const bus_1 = require("./bus"); // definir Route ↔ Bus/Driver aquí
const driver_1 = require("./driver");
class Route extends sequelize_1.Model {
}
exports.Route = Route;
Route.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    startPoint: { field: "start_point", type: sequelize_1.DataTypes.STRING(190), allowNull: false },
    endPoint: { field: "end_point", type: sequelize_1.DataTypes.STRING(190), allowNull: false },
    currentBusId: { field: "current_bus_id", type: sequelize_1.DataTypes.BIGINT, allowNull: true },
    currentDriverId: { field: "current_driver_id", type: sequelize_1.DataTypes.BIGINT, allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false, defaultValue: "ACTIVE" },
}, { sequelize: db_1.default, modelName: "Route", tableName: "routes", timestamps: true, underscored: true });
// Relaciones Route ↔ Bus/Driver (y lado inverso aquí)
Route.belongsTo(bus_1.Bus, { as: "currentBus", foreignKey: "currentBusId", targetKey: "id" });
bus_1.Bus.hasMany(Route, { as: "routesAsCurrent", foreignKey: "currentBusId", sourceKey: "id" });
Route.belongsTo(driver_1.Driver, { as: "currentDriver", foreignKey: "currentDriverId", targetKey: "id" });
driver_1.Driver.hasMany(Route, { as: "routesAsCurrentDriver", foreignKey: "currentDriverId", sourceKey: "id" });
//# sourceMappingURL=route.js.map