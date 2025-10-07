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
exports.IncidenceController = void 0;
const incidence_1 = require("../database/models/incidence");
class IncidenceController {
    getAllIncidences(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.severity)
                    where.severity = req.query.severity;
                if (req.query.busId) {
                    const busId = Number(req.query.busId);
                    if (Number.isNaN(busId))
                        return res.status(400).json({ error: "Invalid busId" });
                    where.busId = busId;
                }
                if (req.query.routeId) {
                    const routeId = Number(req.query.routeId);
                    if (Number.isNaN(routeId))
                        return res.status(400).json({ error: "Invalid routeId" });
                    where.routeId = routeId;
                }
                const data = yield incidence_1.Incidence.findAll({ where });
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching incidences" });
            }
        });
    }
    getIncidenceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const row = yield incidence_1.Incidence.findByPk(id);
                if (!row)
                    return res.status(404).json({ error: "Incidence not found" });
                res.status(200).json(row);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching incidence" });
            }
        });
    }
}
exports.IncidenceController = IncidenceController;
//# sourceMappingURL=incidence.controller.js.map