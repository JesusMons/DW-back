"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stop = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class Stop extends sequelize_1.Model {
}
exports.Stop = Stop;
Stop.init({
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false, unique: true },
    direction: { type: sequelize_1.DataTypes.STRING(200), allowNull: false },
    order: sequelize_1.DataTypes.INTEGER,
    landmark: sequelize_1.DataTypes.STRING(200),
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVA", "INACTIVA"), defaultValue: "ACTIVA" },
}, { sequelize: db_1.default, modelName: "Stop", tableName: "stops", timestamps: true });
// (Sin FKs físicas en tu diseño actual)
//# sourceMappingURL=stopI.js.map