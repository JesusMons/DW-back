"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assistance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const student_1 = require("./student");
const route_1 = require("./route");
const bus_1 = require("./bus");
class Assistance extends sequelize_1.Model {
}
exports.Assistance = Assistance;
Assistance.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    studentId: { field: "student_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    routeId: { field: "route_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    busId: { field: "bus_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    date: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    time: { type: sequelize_1.DataTypes.TIME, allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM("CONFIRMADO", "AUSENTE", "CANCELADO"), allowNull: false, defaultValue: "CONFIRMADO" },
}, { sequelize: db_1.default, modelName: "Assistance", tableName: "assistances", timestamps: true, underscored: true });
Assistance.belongsTo(student_1.Student, { foreignKey: "studentId" });
Assistance.belongsTo(route_1.Route, { foreignKey: "routeId" });
Assistance.belongsTo(bus_1.Bus, { foreignKey: "busId" });
student_1.Student.hasMany(Assistance, { foreignKey: "studentId" });
route_1.Route.hasMany(Assistance, { foreignKey: "routeId" });
bus_1.Bus.hasMany(Assistance, { foreignKey: "busId" });
//# sourceMappingURL=assistance.js.map