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
                    if (!Number.isNaN(busId)) {
                        where.busId = busId;
                    }
                }
                if (req.query.routeId) {
                    const routeId = Number(req.query.routeId);
                    if (!Number.isNaN(routeId)) {
                        where.routeId = routeId;
                    }
                }
                const incidences = yield incidence_1.Incidence.findAll({ where });
                res.status(200).json({ incidences });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching incidences" });
            }
        });
    }
    getIncidenceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const incidence = yield incidence_1.Incidence.findOne({
                    where: { id: pk },
                });
                if (incidence) {
                    res.status(200).json(incidence);
                }
                else {
                    res.status(404).json({ error: "Incidence not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching incidence" });
            }
        });
    }
    createIncidence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { busId, routeId, description, severity, status, reportedAt, resolvedAt, reportedBy, actionsTaken, } = req.body;
            try {
                const body = {
                    busId,
                    routeId,
                    description,
                    severity,
                    status,
                    reportedAt,
                    resolvedAt,
                    reportedBy,
                    actionsTaken,
                };
                const newIncidence = yield incidence_1.Incidence.create(Object.assign({}, body));
                res.status(201).json(newIncidence);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateIncidence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { busId, routeId, description, severity, status, reportedAt, resolvedAt, reportedBy, actionsTaken, } = req.body;
            try {
                const body = {
                    busId,
                    routeId,
                    description,
                    severity,
                    status,
                    reportedAt,
                    resolvedAt,
                    reportedBy,
                    actionsTaken,
                };
                const incidenceToUpdate = yield incidence_1.Incidence.findOne({
                    where: { id: pk },
                });
                if (incidenceToUpdate) {
                    yield incidenceToUpdate.update(body);
                    res.status(200).json(incidenceToUpdate);
                }
                else {
                    res.status(404).json({ error: "Incidence not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteIncidence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const incidenceToDelete = yield incidence_1.Incidence.findByPk(pk);
                if (incidenceToDelete) {
                    yield incidenceToDelete.destroy();
                    res.status(200).json({ message: "Incidence deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Incidence not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting incidence" });
            }
        });
    }
    deleteIncidenceAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const incidenceToDisable = yield incidence_1.Incidence.findOne({
                    where: { id: pk },
                });
                if (incidenceToDisable) {
                    yield incidenceToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Incidence marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Incidence not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking incidence as inactive" });
            }
        });
    }
}
exports.IncidenceController = IncidenceController;
//# sourceMappingURL=incidence.controller.js.map