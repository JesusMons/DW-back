"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUser = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../db"));
class RoleUser extends sequelize_1.Model {
}
exports.RoleUser = RoleUser;
RoleUser.init({
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"),
        defaultValue: "ACTIVO",
    }
}, {
    tableName: "role_users",
    sequelize: db_1.default,
    timestamps: false
});
//# sourceMappingURL=RolUser.js.map