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
exports.ResourceRoleController = void 0;
const Resource_1 = require("../database/models/auth/Resource");
const ResourceRole_1 = require("../database/models/auth/ResourceRole");
const Rol_1 = require("../database/models/auth/Rol");
const resourceRoleInclude = [
    {
        model: Rol_1.Role,
        attributes: ["id", "name", "status"],
    },
    {
        model: Resource_1.Resource,
        attributes: ["id", "path", "method", "status"],
    },
];
class ResourceRoleController {
    getAllResourceRoles(req, res) {
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
                if (req.query.resourceId) {
                    const resourceId = Number(req.query.resourceId);
                    if (!Number.isNaN(resourceId)) {
                        where.resource_id = resourceId;
                    }
                }
                const resourceRoles = yield ResourceRole_1.ResourceRole.findAll({
                    where,
                    include: resourceRoleInclude,
                });
                res.status(200).json({ resourceRoles });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching resource roles" });
            }
        });
    }
    getResourceRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const resourceRole = yield ResourceRole_1.ResourceRole.findByPk(id, {
                    include: resourceRoleInclude,
                });
                if (resourceRole) {
                    res.status(200).json(resourceRole);
                }
                else {
                    res.status(404).json({ error: "Resource role not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching resource role" });
            }
        });
    }
    createResourceRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource_id, role_id, status } = req.body;
            try {
                const body = {
                    resource_id,
                    role_id,
                    status,
                };
                const newResourceRole = yield ResourceRole_1.ResourceRole.create(Object.assign({}, body));
                const created = yield ResourceRole_1.ResourceRole.findByPk(newResourceRole.id, {
                    include: resourceRoleInclude,
                });
                res.status(201).json(created);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateResourceRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ error: "Invalid id" });
            }
            const { resource_id, role_id, status } = req.body;
            try {
                const body = {
                    resource_id,
                    role_id,
                    status,
                };
                const resourceRoleToUpdate = yield ResourceRole_1.ResourceRole.findByPk(id);
                if (resourceRoleToUpdate) {
                    yield resourceRoleToUpdate.update(body);
                    const updated = yield ResourceRole_1.ResourceRole.findByPk(id, {
                        include: resourceRoleInclude,
                    });
                    res.status(200).json(updated);
                }
                else {
                    res.status(404).json({ error: "Resource role not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteResourceRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const resourceRoleToDelete = yield ResourceRole_1.ResourceRole.findByPk(id);
                if (resourceRoleToDelete) {
                    yield resourceRoleToDelete.destroy();
                    res
                        .status(200)
                        .json({ message: "Resource role deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Resource role not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting resource role" });
            }
        });
    }
    deleteResourceRoleAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const resourceRoleToDisable = yield ResourceRole_1.ResourceRole.findByPk(id);
                if (resourceRoleToDisable) {
                    yield resourceRoleToDisable.update({ status: "INACTIVO" });
                    res
                        .status(200)
                        .json({ message: "Resource role marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Resource role not found" });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "Error marking resource role as inactive" });
            }
        });
    }
}
exports.ResourceRoleController = ResourceRoleController;
//# sourceMappingURL=resource-role.controller.js.map