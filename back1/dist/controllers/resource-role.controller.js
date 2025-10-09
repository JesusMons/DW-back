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
class ResourceRoleController {
    getAllResourceRoles(req, res) {
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
                if (req.query.resourceId) {
                    const resourceId = Number(req.query.resourceId);
                    if (Number.isNaN(resourceId))
                        return res.status(400).json({ error: "Invalid resourceId" });
                    where.resource_id = resourceId;
                }
                const include = [
                    {
                        model: Rol_1.Role,
                        attributes: ["id", "name", "status"],
                    },
                    {
                        model: Resource_1.Resource,
                        attributes: ["id", "path", "method", "status"],
                    },
                ];
                const resourceRoles = yield ResourceRole_1.ResourceRole.findAll({ where, include });
                res.status(200).json(resourceRoles);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching resource roles" });
            }
        });
    }
    getResourceRoleById(req, res) {
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
                        model: Resource_1.Resource,
                        attributes: ["id", "path", "method", "status"],
                    },
                ];
                const resourceRole = yield ResourceRole_1.ResourceRole.findByPk(id, { include });
                if (!resourceRole)
                    return res.status(404).json({ error: "Resource role not found" });
                res.status(200).json(resourceRole);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching resource role" });
            }
        });
    }
}
exports.ResourceRoleController = ResourceRoleController;
//# sourceMappingURL=resource-role.controller.js.map