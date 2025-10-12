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
exports.ResourceController = void 0;
const Resource_1 = require("../database/models/auth/Resource");
class ResourceController {
    getAllResources(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.method)
                    where.method = req.query.method;
                const resources = yield Resource_1.Resource.findAll({ where });
                res.status(200).json({ resources });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching resources" });
            }
        });
    }
    getResourceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const resource = yield Resource_1.Resource.findByPk(id);
                if (resource) {
                    res.status(200).json(resource);
                }
                else {
                    res.status(404).json({ error: "Resource not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching resource" });
            }
        });
    }
    createResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { path, method, status } = req.body;
            try {
                const body = {
                    path,
                    method,
                    status,
                };
                const newResource = yield Resource_1.Resource.create(Object.assign({}, body));
                res.status(201).json(newResource);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ error: "Invalid id" });
            }
            const { path, method, status } = req.body;
            try {
                const body = {
                    path,
                    method,
                    status,
                };
                const resourceToUpdate = yield Resource_1.Resource.findByPk(id);
                if (resourceToUpdate) {
                    yield resourceToUpdate.update(body);
                    res.status(200).json(resourceToUpdate);
                }
                else {
                    res.status(404).json({ error: "Resource not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const resourceToDelete = yield Resource_1.Resource.findByPk(id);
                if (resourceToDelete) {
                    yield resourceToDelete.destroy();
                    res.status(200).json({ message: "Resource deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Resource not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting resource" });
            }
        });
    }
    deleteResourceAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const resourceToDisable = yield Resource_1.Resource.findByPk(id);
                if (resourceToDisable) {
                    yield resourceToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Resource marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Resource not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking resource as inactive" });
            }
        });
    }
}
exports.ResourceController = ResourceController;
//# sourceMappingURL=resource.controller.js.map