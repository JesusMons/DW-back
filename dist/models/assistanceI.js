"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assistance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const studentI_1 = require("./studentI");
const RouteI_1 = require("./RouteI");
const busI_1 = require("./busI");
class Assistance extends sequelize_1.Model {
}
exports.Assistance = Assistance;
Assistance.init({
    student_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "students", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    route_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "routes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    bus_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "buses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    date: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    time: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: false,
        validate: {
            notEmpty: { msg: "La hora no puede estar vacía" },
            is: {
                args: /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/,
                msg: "Formato de hora inválido. Usa HH:mm o HH:mm:ss",
            },
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("CONFIRMADO", "AUSENTE", "CANCELADO"),
        defaultValue: "CONFIRMADO",
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: "Assistance",
    tableName: "assistances",
    timestamps: true,
    indexes: [
        { fields: ["student_id"] },
        { fields: ["route_id"] },
        { fields: ["bus_id"] },
        { fields: ["date"] },
        { unique: true, fields: ["student_id", "route_id", "date", "time"], name: "uniq_student_route_date_time" },
    ],
});
// Asociaciones
studentI_1.Student.hasMany(Assistance, { foreignKey: "student_id", sourceKey: "id" });
Assistance.belongsTo(studentI_1.Student, { foreignKey: "student_id", targetKey: "id" });
RouteI_1.Route.hasMany(Assistance, { foreignKey: "route_id", sourceKey: "id" });
Assistance.belongsTo(RouteI_1.Route, { foreignKey: "route_id", targetKey: "id" });
busI_1.Bus.hasMany(Assistance, { foreignKey: "bus_id", sourceKey: "id" });
Assistance.belongsTo(busI_1.Bus, { foreignKey: "bus_id", targetKey: "id" });
//# sourceMappingURL=assistanceI.js.map