"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../db"));
const RolUser_1 = require("./RolUser");
class Role extends sequelize_1.Model {
}
exports.Role = Role;
Role.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"),
        defaultValue: "ACTIVO",
    }
}, {
    tableName: "roles",
    sequelize: db_1.default,
    timestamps: false
});
Role.hasMany(RolUser_1.RoleUser, {
    foreignKey: 'role_id',
    sourceKey: "id",
});
RolUser_1.RoleUser.belongsTo(Role, {
    foreignKey: 'role_id',
    targetKey: "id",
});
//# sourceMappingURL=Rol.js.map