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
exports.AssistanceController = void 0;
const assistance_1 = require("../database/models/assistance");
class AssistanceController {
    getAllAssistances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.studentId) {
                    const studentId = Number(req.query.studentId);
                    if (!Number.isNaN(studentId)) {
                        where.studentId = studentId;
                    }
                }
                if (req.query.routeId) {
                    const routeId = Number(req.query.routeId);
                    if (!Number.isNaN(routeId)) {
                        where.routeId = routeId;
                    }
                }
                if (req.query.busId) {
                    const busId = Number(req.query.busId);
                    if (!Number.isNaN(busId)) {
                        where.busId = busId;
                    }
                }
                if (req.query.date)
                    where.date = req.query.date;
                const assistances = yield assistance_1.Assistance.findAll({ where });
                res.status(200).json({ assistances });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching assistances" });
            }
        });
    }
    getAssistanceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const assistance = yield assistance_1.Assistance.findOne({
                    where: { id: pk },
                });
                if (assistance) {
                    res.status(200).json(assistance);
                }
                else {
                    res.status(404).json({ error: "Assistance not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching assistance" });
            }
        });
    }
    createAssistance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId, routeId, busId, date, time, status } = req.body;
            try {
                const body = {
                    studentId,
                    routeId,
                    busId,
                    date,
                    time,
                    status,
                };
                const newAssistance = yield assistance_1.Assistance.create(Object.assign({}, body));
                res.status(201).json(newAssistance);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateAssistance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { studentId, routeId, busId, date, time, status } = req.body;
            try {
                const body = {
                    studentId,
                    routeId,
                    busId,
                    date,
                    time,
                    status,
                };
                const assistanceToUpdate = yield assistance_1.Assistance.findOne({
                    where: { id: pk },
                });
                if (assistanceToUpdate) {
                    yield assistanceToUpdate.update(body);
                    res.status(200).json(assistanceToUpdate);
                }
                else {
                    res.status(404).json({ error: "Assistance not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteAssistance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const assistanceToDelete = yield assistance_1.Assistance.findByPk(pk);
                if (assistanceToDelete) {
                    yield assistanceToDelete.destroy();
                    res.status(200).json({ message: "Assistance deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Assistance not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting assistance" });
            }
        });
    }
    deleteAssistanceAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const assistanceToDisable = yield assistance_1.Assistance.findOne({
                    where: { id: pk },
                });
                if (assistanceToDisable) {
                    yield assistanceToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Assistance marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Assistance not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking assistance as inactive" });
            }
        });
    }
}
exports.AssistanceController = AssistanceController;
//# sourceMappingURL=assistance.controller.js.map