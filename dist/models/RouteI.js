"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const busI_1 = require("./busI");
const assistanceI_1 = require("./assistanceI");
const incidenceI_1 = require("./incidenceI");
const ItineraryI_1 = require("./ItineraryI");
const route_assignment_1 = require("./route_assignment");
class Route extends sequelize_1.Model {
}
exports.Route = Route;
Route.init({
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    stops: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    startPoint: { type: sequelize_1.DataTypes.STRING(200), allowNull: false },
    endPoint: { type: sequelize_1.DataTypes.STRING(200), allowNull: false },
    schedule: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    busId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "buses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        field: "bus_id",
    },
    driver: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
}, {
    sequelize: db_1.default,
    modelName: "Route",
    tableName: "routes",
    timestamps: true,
    indexes: [{ fields: ["bus_id"] }, { fields: ["status"] }],
});
// Asociaciones
Route.belongsTo(busI_1.Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
Route.hasMany(assistanceI_1.Assistance, { foreignKey: "route_id", sourceKey: "id", as: "assistances" });
assistanceI_1.Assistance.belongsTo(Route, { foreignKey: "route_id", targetKey: "id", as: "route" });
Route.hasMany(incidenceI_1.Incidence, { foreignKey: "routeId", sourceKey: "id", as: "incidences" });
incidenceI_1.Incidence.belongsTo(Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
Route.hasMany(ItineraryI_1.Itinerary, { foreignKey: "routeId", sourceKey: "id", as: "itineraries" });
ItineraryI_1.Itinerary.belongsTo(Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
Route.hasMany(route_assignment_1.RouteAssignment, { foreignKey: "routeId", sourceKey: "id", as: "assignments" });
route_assignment_1.RouteAssignment.belongsTo(Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
//# sourceMappingURL=RouteI.js.map