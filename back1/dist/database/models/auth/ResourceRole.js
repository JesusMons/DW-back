"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRole = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../db"));
const Resource_1 = require("./Resource");
const Rol_1 = require("./Rol");
class ResourceRole extends sequelize_1.Model {
}
exports.ResourceRole = ResourceRole;
ResourceRole.init({
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO"),
        defaultValue: "ACTIVO",
    },
}, {
    tableName: "resource_roles",
    sequelize: db_1.default,
    timestamps: false,
});
// Define relationships
Resource_1.Resource.hasMany(ResourceRole, {
    foreignKey: "resource_id",
    sourceKey: "id",
});
ResourceRole.belongsTo(Resource_1.Resource, {
    foreignKey: "resource_id",
    targetKey: "id",
});
Rol_1.Role.hasMany(ResourceRole, {
    foreignKey: "role_id",
    sourceKey: "id",
});
ResourceRole.belongsTo(Rol_1.Role, {
    foreignKey: "role_id",
    targetKey: "id",
});
//# sourceMappingURL=ResourceRole.js.map