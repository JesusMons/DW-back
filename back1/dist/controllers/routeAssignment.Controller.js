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
exports.RouteAssignmentController = void 0;
const routeAssignment_1 = require("../database/models/routeAssignment");
class RouteAssignmentController {
    getAllRouteAssignments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const routeAssignments = yield routeAssignment_1.RouteAssignment.findAll({ where });
                res.status(200).json({ routeAssignments });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching route assignments" });
            }
        });
    }
    getRouteAssignmentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const routeAssignment = yield routeAssignment_1.RouteAssignment.findOne({
                    where: { id: pk },
                });
                if (routeAssignment) {
                    res.status(200).json(routeAssignment);
                }
                else {
                    res.status(404).json({ error: "Route assignment not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching route assignment" });
            }
        });
    }
    createRouteAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { routeId, busId, driverId, startDate, endDate, status, } = req.body;
            try {
                const body = {
                    routeId,
                    busId,
                    driverId,
                    startDate,
                    endDate,
                    status,
                };
                const newRouteAssignment = yield routeAssignment_1.RouteAssignment.create(Object.assign({}, body));
                res.status(201).json(newRouteAssignment);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateRouteAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { routeId, busId, driverId, startDate, endDate, status, } = req.body;
            try {
                const body = {
                    routeId,
                    busId,
                    driverId,
                    startDate,
                    endDate,
                    status,
                };
                const routeAssignmentToUpdate = yield routeAssignment_1.RouteAssignment.findOne({
                    where: { id: pk },
                });
                if (routeAssignmentToUpdate) {
                    yield routeAssignmentToUpdate.update(body);
                    res.status(200).json(routeAssignmentToUpdate);
                }
                else {
                    res.status(404).json({ error: "Route assignment not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRouteAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const routeAssignmentToDelete = yield routeAssignment_1.RouteAssignment.findByPk(pk);
                if (routeAssignmentToDelete) {
                    yield routeAssignmentToDelete.destroy();
                    res
                        .status(200)
                        .json({ message: "Route assignment deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Route assignment not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting route assignment" });
            }
        });
    }
    deleteRouteAssignmentAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const routeAssignmentToDisable = yield routeAssignment_1.RouteAssignment.findOne({
                    where: { id: pk },
                });
                if (routeAssignmentToDisable) {
                    yield routeAssignmentToDisable.update({ status: "INACTIVO" });
                    res
                        .status(200)
                        .json({ message: "Route assignment marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Route assignment not found" });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "Error marking route assignment as inactive" });
            }
        });
    }
}
exports.RouteAssignmentController = RouteAssignmentController;
//# sourceMappingURL=routeAssignment.Controller.js.map