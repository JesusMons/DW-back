"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const busI_1 = require("./busI");
const route_assignment_1 = require("./route_assignment");
class Driver extends sequelize_1.Model {
}
exports.Driver = Driver;
Driver.init({
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    document: sequelize_1.DataTypes.STRING(50),
    phone: sequelize_1.DataTypes.STRING(30),
    email: { type: sequelize_1.DataTypes.STRING(120), validate: { isEmail: true } },
    address: sequelize_1.DataTypes.STRING(200),
    type_licence: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    licenceExpiry: sequelize_1.DataTypes.DATEONLY,
    experienceYears: sequelize_1.DataTypes.INTEGER,
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO", "SUSPENDIDO"), defaultValue: "ACTIVO" },
    assignedBusId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "buses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        field: "assigned_bus_id",
    },
    photoUrl: sequelize_1.DataTypes.STRING(500),
}, { sequelize: db_1.default, modelName: "Driver", tableName: "drivers", timestamps: true });
// Asociaciones
Driver.belongsTo(busI_1.Bus, { foreignKey: "assignedBusId", targetKey: "id", as: "assigned_bus" });
Driver.hasMany(route_assignment_1.RouteAssignment, { foreignKey: "driverId", sourceKey: "id", as: "assignments" });
route_assignment_1.RouteAssignment.belongsTo(Driver, { foreignKey: "driverId", targetKey: "id", as: "driver" });
//# sourceMappingURL=driverI.js.map