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
                    if (Number.isNaN(studentId))
                        return res.status(400).json({ error: "Invalid studentId" });
                    where.studentId = studentId;
                }
                if (req.query.routeId) {
                    const routeId = Number(req.query.routeId);
                    if (Number.isNaN(routeId))
                        return res.status(400).json({ error: "Invalid routeId" });
                    where.routeId = routeId;
                }
                if (req.query.busId) {
                    const busId = Number(req.query.busId);
                    if (Number.isNaN(busId))
                        return res.status(400).json({ error: "Invalid busId" });
                    where.busId = busId;
                }
                if (req.query.date)
                    where.date = req.query.date;
                const data = yield assistance_1.Assistance.findAll({ where });
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching assistances" });
            }
        });
    }
    getAssistanceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const row = yield assistance_1.Assistance.findByPk(id);
                if (!row)
                    return res.status(404).json({ error: "Assistance not found" });
                res.status(200).json(row);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching assistance" });
            }
        });
    }
    createAssistance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId, routeId, busId, date, time, status } = req.body;
                // Validación de campos requeridos
                if (!studentId || !routeId || !busId || !date || !time || !status) {
                    return res.status(400).json({ error: "Missing required fields" });
                }
                const newAssistance = yield assistance_1.Assistance.create({
                    studentId,
                    routeId,
                    busId,
                    date,
                    time,
                    status,
                });
                res.status(201).json(newAssistance);
            }
            catch (err) {
                res.status(500).json({ error: "Error creating assistance" });
            }
        });
    }
}
exports.AssistanceController = AssistanceController;
//# sourceMappingURL=assistance.controller.js.map