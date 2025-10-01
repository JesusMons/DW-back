"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteRoute = void 0;
const route_Controller_1 = require("../controller/route.Controller");
class RouteRoute {
    constructor() {
        this.routeController = new route_Controller_1.RouteController();
    }
    routes(app) {
        app.route("/api/routes").get(this.routeController.getRoutes);
    }
}
exports.RouteRoute = RouteRoute;
//# sourceMappingURL=route.route.js.map