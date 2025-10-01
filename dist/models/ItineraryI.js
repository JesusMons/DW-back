"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Itinerary = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const RouteI_1 = require("./RouteI");
const busI_1 = require("./busI");
class Itinerary extends sequelize_1.Model {
}
exports.Itinerary = Itinerary;
Itinerary.init({
    routeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "routes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        field: "route_id",
    },
    date: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    departureTime: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false,
        validate: { is: /^\d{2}:\d{2}$/ },
    },
    arrivalTime: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false,
        validate: { is: /^\d{2}:\d{2}$/ },
    },
    stopsSchedule: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    driver: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    busId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "buses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        field: "bus_id",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("PLANEADO", "EN PROGRESO", "COMPLETADO", "CANCELADO"),
        defaultValue: "PLANEADO",
    },
    notes: sequelize_1.DataTypes.TEXT,
}, {
    sequelize: db_1.default,
    modelName: "Itinerary",
    tableName: "itineraries",
    timestamps: true,
    indexes: [
        { fields: ["route_id"] },
        { fields: ["bus_id"] },
        { fields: ["status"] },
        { fields: ["date"] },
    ],
});
// Asociaciones
Itinerary.belongsTo(RouteI_1.Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
Itinerary.belongsTo(busI_1.Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
//# sourceMappingURL=ItineraryI.js.map