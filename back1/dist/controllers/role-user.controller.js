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
const roleUserInclude = [
    {
        model: Rol_1.Role,
        attributes: ["id", "name", "status"],
    },
    {
        model: User_1.User,
        attributes: ["id", "username", "email", "status"],
    },
];
class RoleUserController {
    getAllRoleUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.roleId) {
                    const roleId = Number(req.query.roleId);
                    if (!Number.isNaN(roleId)) {
                        where.role_id = roleId;
                    }
                }
                if (req.query.userId) {
                    const userId = Number(req.query.userId);
                    if (!Number.isNaN(userId)) {
                        where.user_id = userId;
                    }
                }
                const roleUsers = yield RolUser_1.RoleUser.findAll({ where, include: roleUserInclude });
                res.status(200).json({ roleUsers });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching role users" });
            }
        });
    }
    getRoleUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const roleUser = yield RolUser_1.RoleUser.findByPk(id, { include: roleUserInclude });
                if (roleUser) {
                    res.status(200).json(roleUser);
                }
                else {
                    res.status(404).json({ error: "Role user not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching role user" });
            }
        });
    }
    createRoleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role_id, user_id, status } = req.body;
            try {
                const body = {
                    role_id,
                    user_id,
                    status,
                };
                const newRoleUser = yield RolUser_1.RoleUser.create(Object.assign({}, body));
                const created = yield RolUser_1.RoleUser.findByPk(newRoleUser.id, { include: roleUserInclude });
                res.status(201).json(created);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateRoleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ error: "Invalid id" });
            }
            const { role_id, user_id, status } = req.body;
            try {
                const body = {
                    role_id,
                    user_id,
                    status,
                };
                const roleUserToUpdate = yield RolUser_1.RoleUser.findByPk(id);
                if (roleUserToUpdate) {
                    yield roleUserToUpdate.update(body);
                    const updated = yield RolUser_1.RoleUser.findByPk(id, { include: roleUserInclude });
                    res.status(200).json(updated);
                }
                else {
                    res.status(404).json({ error: "Role user not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRoleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const roleUserToDelete = yield RolUser_1.RoleUser.findByPk(id);
                if (roleUserToDelete) {
                    yield roleUserToDelete.destroy();
                    res.status(200).json({ message: "Role user deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Role user not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting role user" });
            }
        });
    }
    deleteRoleUserAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const roleUserToDisable = yield RolUser_1.RoleUser.findByPk(id);
                if (roleUserToDisable) {
                    yield roleUserToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Role user marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Role user not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking role user as inactive" });
            }
        });
    }
}
exports.RoleUserController = RoleUserController;
//# sourceMappingURL=role-user.controller.js.map