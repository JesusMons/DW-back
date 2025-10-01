"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteAssignmentRoute = void 0;
const routeAssignment_Controller_1 = require("../controller/routeAssignment.Controller");
class RouteAssignmentRoute {
    constructor() {
        this.routeAssignmentController = new routeAssignment_Controller_1.RouteAssignmentController();
    }
    routes(app) {
        app.route("/api/route-assignments").get(this.routeAssignmentController.getAssignments);
    }
}
exports.RouteAssignmentRoute = RouteAssignmentRoute;
//# sourceMappingURL=routeAssignment.route.js.map