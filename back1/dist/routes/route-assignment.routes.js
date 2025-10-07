"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteAssignmentRoutes = void 0;
const routeAssignment_Controller_1 = require("../controllers/routeAssignment.Controller");
class RouteAssignmentRoutes {
    constructor() {
        this.routeAssignmentController = new routeAssignment_Controller_1.RouteAssignmentController();
    }
    routes(app) {
        app
            .route("/api/route-assignments")
            .get(this.routeAssignmentController.getAllRouteAssignments.bind(this.routeAssignmentController));
        app
            .route("/api/route-assignments/:id")
            .get(this.routeAssignmentController.getRouteAssignmentById.bind(this.routeAssignmentController));
    }
}
exports.RouteAssignmentRoutes = RouteAssignmentRoutes;
//# sourceMappingURL=route-assignment.routes.js.map