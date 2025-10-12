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
exports.RoleController = void 0;
const Rol_1 = require("../database/models/auth/Rol");
class RoleController {
    getAllRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const roles = yield Rol_1.Role.findAll({ where });
                res.status(200).json({ roles });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching roles" });
            }
        });
    }
    getRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const role = yield Rol_1.Role.findByPk(id);
                if (role) {
                    res.status(200).json(role);
                }
                else {
                    res.status(404).json({ error: "Role not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching role" });
            }
        });
    }
    createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, status } = req.body;
            try {
                const body = {
                    name,
                    status,
                };
                const newRole = yield Rol_1.Role.create(Object.assign({}, body));
                res.status(201).json(newRole);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ error: "Invalid id" });
            }
            const { name, status } = req.body;
            try {
                const body = {
                    name,
                    status,
                };
                const roleToUpdate = yield Rol_1.Role.findByPk(id);
                if (roleToUpdate) {
                    yield roleToUpdate.update(body);
                    res.status(200).json(roleToUpdate);
                }
                else {
                    res.status(404).json({ error: "Role not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const roleToDelete = yield Rol_1.Role.findByPk(id);
                if (roleToDelete) {
                    yield roleToDelete.destroy();
                    res.status(200).json({ message: "Role deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Role not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting role" });
            }
        });
    }
    deleteRoleAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const roleToDisable = yield Rol_1.Role.findByPk(id);
                if (roleToDisable) {
                    yield roleToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Role marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Role not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking role as inactive" });
            }
        });
    }
}
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map