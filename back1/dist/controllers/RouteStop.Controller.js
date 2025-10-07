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
                const data = yield routeStop_1.RouteStop.findAll();
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching route_stops" });
            }
        });
    }
    getRouteStopById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routeId = Number(req.params.routeId);
                const stopId = Number(req.params.stopId);
                if (Number.isNaN(routeId) || Number.isNaN(stopId))
                    return res.status(400).json({ error: "Invalid composite id" });
                const row = yield routeStop_1.RouteStop.findOne({ where: { routeId, stopId } });
                if (!row)
                    return res.status(404).json({ error: "RouteStop not found" });
                res.status(200).json(row);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching route_stop" });
            }
        });
    }
}
exports.RouteStopController = RouteStopController;
//# sourceMappingURL=RouteStop.Controller.js.map