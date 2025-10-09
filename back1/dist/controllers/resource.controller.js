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
                res.status(200).json(resources);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching resources" });
            }
        });
    }
    getResourceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const resource = yield Resource_1.Resource.findByPk(id);
                if (!resource)
                    return res.status(404).json({ error: "Resource not found" });
                res.status(200).json(resource);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching resource" });
            }
        });
    }
}
exports.ResourceController = ResourceController;
//# sourceMappingURL=resource.controller.js.map