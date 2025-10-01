"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incidence = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const busI_1 = require("./busI");
const RouteI_1 = require("./RouteI");
class Incidence extends sequelize_1.Model {
}
exports.Incidence = Incidence;
Incidence.init({
    busId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "buses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        field: "bus_id",
    },
    routeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "routes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        field: "route_id",
    },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    severity: { type: sequelize_1.DataTypes.ENUM("BAJA", "MEDIA", "ALTA", "CRITICA"), allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM("ABIERTA", "EN PROGRESO", "RESUELTO", "CERRADO"), defaultValue: "ABIERTA" },
    reportedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    resolvedAt: sequelize_1.DataTypes.DATE,
    reportedBy: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    actionsTaken: sequelize_1.DataTypes.TEXT,
}, {
    sequelize: db_1.default,
    modelName: "Incidence",
    tableName: "incidences",
    timestamps: true,
    indexes: [
        { fields: ["bus_id"] },
        { fields: ["route_id"] },
        { fields: ["status"] },
        { fields: ["severity"] },
    ],
});
// Asociaciones
Incidence.belongsTo(busI_1.Bus, { foreignKey: "busId", targetKey: "id", as: "bus" });
Incidence.belongsTo(RouteI_1.Route, { foreignKey: "routeId", targetKey: "id", as: "route" });
//# sourceMappingURL=incidenceI.js.map