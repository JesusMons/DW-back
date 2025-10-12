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
exports.RouteStopController = void 0;
const routeStop_1 = require("../database/models/routeStop");
class RouteStopController {
    getAllRouteStops(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.routeId) {
                    const routeId = Number(req.query.routeId);
                    if (!Number.isNaN(routeId))
                        where.routeId = routeId;
                }
                if (req.query.stopId) {
                    const stopId = Number(req.query.stopId);
                    if (!Number.isNaN(stopId))
                        where.stopId = stopId;
                }
                const routeStops = yield routeStop_1.RouteStop.findAll({ where });
                res.status(200).json({ routeStops });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching route stops" });
            }
        });
    }
    getRouteStopById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routeId = Number(req.params.routeId);
                const stopId = Number(req.params.stopId);
                if (Number.isNaN(routeId) || Number.isNaN(stopId)) {
                    return res.status(400).json({ error: "Invalid composite id" });
                }
                const routeStop = yield routeStop_1.RouteStop.findOne({
                    where: { routeId, stopId },
                });
                if (routeStop) {
                    res.status(200).json(routeStop);
                }
                else {
                    res.status(404).json({ error: "Route stop not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching route stop" });
            }
        });
    }
    createRouteStop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { routeId, stopId, position, scheduledTimeHint, status } = req.body;
            try {
                const body = {
                    routeId,
                    stopId,
                    position,
                    scheduledTimeHint,
                    status,
                };
                const newRouteStop = yield routeStop_1.RouteStop.create(Object.assign({}, body));
                res.status(201).json(newRouteStop);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateRouteStop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const routeId = Number(req.params.routeId);
            const stopId = Number(req.params.stopId);
            if (Number.isNaN(routeId) || Number.isNaN(stopId)) {
                return res.status(400).json({ error: "Invalid composite id" });
            }
            const { position, scheduledTimeHint, status } = req.body;
            try {
                const routeStopToUpdate = yield routeStop_1.RouteStop.findOne({
                    where: { routeId, stopId },
                });
                if (routeStopToUpdate) {
                    yield routeStopToUpdate.update({ position, scheduledTimeHint, status });
                    res.status(200).json(routeStopToUpdate);
                }
                else {
                    res.status(404).json({ error: "Route stop not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRouteStop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routeId = Number(req.params.routeId);
                const stopId = Number(req.params.stopId);
                if (Number.isNaN(routeId) || Number.isNaN(stopId)) {
                    return res.status(400).json({ error: "Invalid composite id" });
                }
                const routeStopToDelete = yield routeStop_1.RouteStop.findOne({
                    where: { routeId, stopId },
                });
                if (routeStopToDelete) {
                    yield routeStopToDelete.destroy();
                    res.status(200).json({ message: "Route stop deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Route stop not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting route stop" });
            }
        });
    }
    deleteRouteStopAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routeId = Number(req.params.routeId);
                const stopId = Number(req.params.stopId);
                if (Number.isNaN(routeId) || Number.isNaN(stopId)) {
                    return res.status(400).json({ error: "Invalid composite id" });
                }
                const routeStopToDisable = yield routeStop_1.RouteStop.findOne({
                    where: { routeId, stopId },
                });
                if (routeStopToDisable) {
                    yield routeStopToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Route stop marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Route stop not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking route stop as inactive" });
            }
        });
    }
}
exports.RouteStopController = RouteStopController;
//# sourceMappingURL=RouteStop.Controller.js.map