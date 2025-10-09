"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stop = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Stop extends sequelize_1.Model {
}
exports.Stop = Stop;
Stop.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    direction: { type: sequelize_1.DataTypes.STRING(190), allowNull: false },
    orderHint: { field: "order_hint", type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    landmark: { type: sequelize_1.DataTypes.STRING(190), allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"), allowNull: false, defaultValue: "ACTIVO" },
}, { sequelize: db_1.default, modelName: "Stop", tableName: "stops", timestamps: true, underscored: true });
//# sourceMappingURL=stop.js.map