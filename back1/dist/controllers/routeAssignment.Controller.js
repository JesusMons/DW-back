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
                const data = yield routeAssignment_1.RouteAssignment.findAll({ where });
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching route_assignments" });
            }
        });
    }
    getRouteAssignmentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const row = yield routeAssignment_1.RouteAssignment.findByPk(id);
                if (!row)
                    return res.status(404).json({ error: "RouteAssignment not found" });
                res.status(200).json(row);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching route_assignment" });
            }
        });
    }
}
exports.RouteAssignmentController = RouteAssignmentController;
//# sourceMappingURL=routeAssignment.Controller.js.map