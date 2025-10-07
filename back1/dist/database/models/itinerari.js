"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Itinerary = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const route_1 = require("./route");
const driver_1 = require("./driver");
const bus_1 = require("./bus");
class Itinerary extends sequelize_1.Model {
}
exports.Itinerary = Itinerary;
Itinerary.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    routeId: { field: "route_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    date: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    departureTime: { field: "departure_time", type: sequelize_1.DataTypes.TIME, allowNull: false },
    arrivalTime: { field: "arrival_time", type: sequelize_1.DataTypes.TIME, allowNull: false },
    driverId: { field: "driver_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    busId: { field: "bus_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM("PLANEADO", "EN PROGRESO", "COMPLETADO", "CANCELADO"), allowNull: false, defaultValue: "PLANEADO" },
    notes: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
}, { sequelize: db_1.default, modelName: "Itinerary", tableName: "itineraries", timestamps: true, underscored: true });
Itinerary.belongsTo(route_1.Route, { foreignKey: "routeId" });
Itinerary.belongsTo(driver_1.Driver, { foreignKey: "driverId" });
Itinerary.belongsTo(bus_1.Bus, { foreignKey: "busId" });
route_1.Route.hasMany(Itinerary, { foreignKey: "routeId" });
driver_1.Driver.hasMany(Itinerary, { foreignKey: "driverId" });
bus_1.Bus.hasMany(Itinerary, { foreignKey: "busId" });
//# sourceMappingURL=itinerari.js.map