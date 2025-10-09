"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../db"));
class Resource extends sequelize_1.Model {
}
exports.Resource = Resource;
Resource.init({
    path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Path cannot be empty" },
        },
    },
    method: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Method cannot be empty" },
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"),
        defaultValue: "ACTIVO",
    },
}, {
    tableName: "resources",
    sequelize: db_1.default,
    timestamps: false,
});
//# sourceMappingURL=Resource.js.map