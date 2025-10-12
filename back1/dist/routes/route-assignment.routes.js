"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteAssignmentRoutes = void 0;
const routeAssignment_Controller_1 = require("../controllers/routeAssignment.Controller");
const auth_1 = require("../middleware/auth");
class RouteAssignmentRoutes {
    constructor() {
        this.routeAssignmentController = new routeAssignment_Controller_1.RouteAssignmentController();
    }
    routes(app) {
        app
            .route("/api/route-assignments")
            .get(auth_1.authMiddleware, this.routeAssignmentController.getAllRouteAssignments.bind(this.routeAssignmentController))
            .post(auth_1.authMiddleware, this.routeAssignmentController.createRouteAssignment.bind(this.routeAssignmentController));
        app
            .route("/api/route-assignments/:id")
            .get(auth_1.authMiddleware, this.routeAssignmentController.getRouteAssignmentById.bind(this.routeAssignmentController))
            .put(auth_1.authMiddleware, this.routeAssignmentController.updateRouteAssignment.bind(this.routeAssignmentController))
            .delete(auth_1.authMiddleware, this.routeAssignmentController.deleteRouteAssignment.bind(this.routeAssignmentController));
        app
            .route("/api/route-assignments/:id/deactivate")
            .patch(auth_1.authMiddleware, this.routeAssignmentController.deleteRouteAssignmentAdv.bind(this.routeAssignmentController));
    }
}
exports.RouteAssignmentRoutes = RouteAssignmentRoutes;
//# sourceMappingURL=route-assignment.routes.js.map