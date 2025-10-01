"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteAssignment = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const RouteI_1 = require("./RouteI");
const busI_1 = require("./busI");
const driverI_1 = require("./driverI");
class RouteAssignment extends sequelize_1.Model {
}
exports.RouteAssignment = RouteAssignment;
RouteAssignment.init({
    routeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "routes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        field: "route_id",
    },
    busId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "buses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        field: "bus_id",
    },
    driverId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "drivers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        field: "driver_id",
    },
    startDate: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    endDate: sequelize_1.DataTypes.DATEONLY,
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"), defaultValue: "ACTIVO" },
}, {
    sequelize: db_1.default,
    modelName: "RouteAssignment",
    tableName: "route_assignments",
    timestamps: true,
    indexes: [
        { fields: ["route_id"] },
        { fields: ["bus_id"] },
        { fields: ["driver_id"] },
        { fields: ["status"] },
    ],
});
// Asociaciones
RouteAssignment.belongsTo(RouteI_1.Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
RouteAssignment.belongsTo(busI_1.Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
RouteAssignment.belongsTo(driverI_1.Driver, { foreignKey: "driverId", targetKey: "id", as: "driver" });
RouteI_1.Route.hasMany(RouteAssignment, { foreignKey: "routeId", sourceKey: "id", as: "assignments" });
busI_1.Bus.hasMany(RouteAssignment, { foreignKey: "busId", sourceKey: "id", as: "assignments" });
driverI_1.Driver.hasMany(RouteAssignment, { foreignKey: "driverId", sourceKey: "id", as: "assignments" });
//# sourceMappingURL=route_assignment.js.map