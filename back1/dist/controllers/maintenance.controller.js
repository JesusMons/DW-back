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
exports.MaintenanceController = void 0;
const maintenance_1 = require("../database/models/maintenance");
class MaintenanceController {
    getAllMaintenances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.type)
                    where.type = req.query.type;
                if (req.query.busId) {
                    const busId = Number(req.query.busId);
                    if (!Number.isNaN(busId)) {
                        where.busId = busId;
                    }
                }
                if (req.query.performedAt)
                    where.performedAt = req.query.performedAt;
                const maintenances = yield maintenance_1.Maintenance.findAll({ where });
                res.status(200).json({ maintenances });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching maintenances" });
            }
        });
    }
    getMaintenanceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const maintenance = yield maintenance_1.Maintenance.findOne({
                    where: { id: pk },
                });
                if (maintenance) {
                    res.status(200).json(maintenance);
                }
                else {
                    res.status(404).json({ error: "Maintenance not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching maintenance" });
            }
        });
    }
    createMaintenance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { busId, type, description, cost, performedAt, nextDueDate, status, mechanic, odometer, } = req.body;
            try {
                const body = {
                    busId,
                    type,
                    description,
                    cost,
                    performedAt,
                    nextDueDate,
                    status,
                    mechanic,
                    odometer,
                };
                const newMaintenance = yield maintenance_1.Maintenance.create(Object.assign({}, body));
                res.status(201).json(newMaintenance);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateMaintenance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { busId, type, description, cost, performedAt, nextDueDate, status, mechanic, odometer, } = req.body;
            try {
                const body = {
                    busId,
                    type,
                    description,
                    cost,
                    performedAt,
                    nextDueDate,
                    status,
                    mechanic,
                    odometer,
                };
                const maintenanceToUpdate = yield maintenance_1.Maintenance.findOne({
                    where: { id: pk },
                });
                if (maintenanceToUpdate) {
                    yield maintenanceToUpdate.update(body);
                    res.status(200).json(maintenanceToUpdate);
                }
                else {
                    res.status(404).json({ error: "Maintenance not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteMaintenance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const maintenanceToDelete = yield maintenance_1.Maintenance.findByPk(pk);
                if (maintenanceToDelete) {
                    yield maintenanceToDelete.destroy();
                    res.status(200).json({ message: "Maintenance deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Maintenance not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting maintenance" });
            }
        });
    }
    deleteMaintenanceAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const maintenanceToDisable = yield maintenance_1.Maintenance.findOne({
                    where: { id: pk },
                });
                if (maintenanceToDisable) {
                    yield maintenanceToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Maintenance marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Maintenance not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking maintenance as inactive" });
            }
        });
    }
}
exports.MaintenanceController = MaintenanceController;
//# sourceMappingURL=maintenance.controller.js.map