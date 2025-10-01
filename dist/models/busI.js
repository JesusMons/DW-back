"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const driverI_1 = require("./driverI");
const RouteI_1 = require("./RouteI");
const assistanceI_1 = require("./assistanceI");
const incidenceI_1 = require("./incidenceI");
const ItineraryI_1 = require("./ItineraryI");
const maintenanceI_1 = require("./maintenanceI");
const route_assignment_1 = require("./route_assignment");
class Bus extends sequelize_1.Model {
}
exports.Bus = Bus;
Bus.init({
    plate: { type: sequelize_1.DataTypes.STRING(20), allowNull: false, unique: true },
    capacity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    mileage: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    model: sequelize_1.DataTypes.STRING(50),
    brand: sequelize_1.DataTypes.STRING(50),
    year: sequelize_1.DataTypes.INTEGER,
    color: sequelize_1.DataTypes.STRING(30),
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO", "EN MANTENIMIENTO"),
        defaultValue: "ACTIVO",
    },
    insuranceExpiry: sequelize_1.DataTypes.DATEONLY,
    lastMaintenance: sequelize_1.DataTypes.DATEONLY,
    nextMaintenance: sequelize_1.DataTypes.DATEONLY,
}, {
    sequelize: db_1.default,
    modelName: "Bus",
    tableName: "buses",
    timestamps: true,
    indexes: [{ unique: true, fields: ["plate"] }],
});
// Asociaciones
Bus.hasMany(driverI_1.Driver, { foreignKey: "assignedBusId", sourceKey: "id", as: "drivers" });
driverI_1.Driver.belongsTo(Bus, { foreignKey: "assignedBusId", targetKey: "id", as: "assigned_bus" });
Bus.hasMany(RouteI_1.Route, { foreignKey: "busId", sourceKey: "id", as: "routes" });
RouteI_1.Route.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
Bus.hasMany(assistanceI_1.Assistance, { foreignKey: "bus_id", sourceKey: "id" });
assistanceI_1.Assistance.belongsTo(Bus, { foreignKey: "bus_id", targetKey: "id" });
Bus.hasMany(incidenceI_1.Incidence, { foreignKey: "busId", sourceKey: "id" });
incidenceI_1.Incidence.belongsTo(Bus, { foreignKey: "busId", targetKey: "id" });
Bus.hasMany(ItineraryI_1.Itinerary, { foreignKey: "busId", sourceKey: "id", as: "itineraries" });
ItineraryI_1.Itinerary.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
Bus.hasMany(maintenanceI_1.Maintenance, { foreignKey: "busId", sourceKey: "id", as: "maintenances" });
maintenanceI_1.Maintenance.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
Bus.hasMany(route_assignment_1.RouteAssignment, { foreignKey: "busId", sourceKey: "id", as: "assignments" });
route_assignment_1.RouteAssignment.belongsTo(Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
//# sourceMappingURL=busI.js.map