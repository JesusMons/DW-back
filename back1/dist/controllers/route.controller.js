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
exports.RouteController = void 0;
const route_1 = require("../database/models/route");
class RouteController {
    getAllRoutes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const routes = yield route_1.Route.findAll({ where });
                res.status(200).json({ routes });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching routes" });
            }
        });
    }
    getRouteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const route = yield route_1.Route.findOne({
                    where: { id: pk },
                });
                if (route) {
                    res.status(200).json(route);
                }
                else {
                    res.status(404).json({ error: "Route not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching route" });
            }
        });
    }
    createRoute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, startPoint, endPoint, currentBusId, currentDriverId, status, } = req.body;
            try {
                const body = {
                    name,
                    startPoint,
                    endPoint,
                    currentBusId,
                    currentDriverId,
                    status,
                };
                const newRoute = yield route_1.Route.create(Object.assign({}, body));
                res.status(201).json(newRoute);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateRoute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { name, startPoint, endPoint, currentBusId, currentDriverId, status, } = req.body;
            try {
                const body = {
                    name,
                    startPoint,
                    endPoint,
                    currentBusId,
                    currentDriverId,
                    status,
                };
                const routeToUpdate = yield route_1.Route.findOne({
                    where: { id: pk },
                });
                if (routeToUpdate) {
                    yield routeToUpdate.update(body);
                    res.status(200).json(routeToUpdate);
                }
                else {
                    res.status(404).json({ error: "Route not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRoute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const routeToDelete = yield route_1.Route.findByPk(pk);
                if (routeToDelete) {
                    yield routeToDelete.destroy();
                    res.status(200).json({ message: "Route deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Route not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting route" });
            }
        });
    }
    deleteRouteAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const routeToDisable = yield route_1.Route.findOne({
                    where: { id: pk },
                });
                if (routeToDisable) {
                    yield routeToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Route marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Route not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking route as inactive" });
            }
        });
    }
}
exports.RouteController = RouteController;
//# sourceMappingURL=route.controller.js.map