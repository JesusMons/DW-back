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
const route_assignment_1 = require("../models/route_assignment");
class RouteAssignmentController {
    getAssignments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignments = yield route_assignment_1.RouteAssignment.findAll({
                    where: { status: "ACTIVO" },
                });
                res.status(200).json({ assignments });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching Route Assignments" });
            }
        });
    }
}
exports.RouteAssignmentController = RouteAssignmentController;
//# sourceMappingURL=routeAssignment.Controller.js.map