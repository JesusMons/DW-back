"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserController = void 0;
const Rol_1 = require("../database/models/auth/Rol");
const RolUser_1 = require("../database/models/auth/RolUser");
const User_1 = require("../database/models/auth/User");
class RoleUserController {
    getAllRoleUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.roleId) {
                    const roleId = Number(req.query.roleId);
                    if (Number.isNaN(roleId))
                        return res.status(400).json({ error: "Invalid roleId" });
                    where.role_id = roleId;
                }
                if (req.query.userId) {
                    const userId = Number(req.query.userId);
                    if (Number.isNaN(userId))
                        return res.status(400).json({ error: "Invalid userId" });
                    where.user_id = userId;
                }
                const include = [
                    {
                        model: Rol_1.Role,
                        attributes: ["id", "name", "status"],
                    },
                    {
                        model: User_1.User,
                        attributes: ["id", "username", "email", "status"],
                    },
                ];
                const roleUsers = yield RolUser_1.RoleUser.findAll({ where, include });
                res.status(200).json(roleUsers);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching role users" });
            }
        });
    }
    getRoleUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const include = [
                    {
                        model: Rol_1.Role,
                        attributes: ["id", "name", "status"],
                    },
                    {
                        model: User_1.User,
                        attributes: ["id", "username", "email", "status"],
                    },
                ];
                const roleUser = yield RolUser_1.RoleUser.findByPk(id, { include });
                if (!roleUser)
                    return res.status(404).json({ error: "Role user not found" });
                res.status(200).json(roleUser);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching role user" });
            }
        });
    }
}
exports.RoleUserController = RoleUserController;
//# sourceMappingURL=role-user.controller.js.map