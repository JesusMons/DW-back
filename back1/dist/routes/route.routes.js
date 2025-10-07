"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteRoutes = void 0;
const route_controller_1 = require("../controllers/route.controller");
class RouteRoutes {
    constructor() {
        this.routeController = new route_controller_1.RouteController();
    }
    routes(app) {
        app
            .route("/api/routes")
            .get(this.routeController.getAllRoutes.bind(this.routeController));
        app
            .route("/api/routes/:id")
            .get(this.routeController.getRouteById.bind(this.routeController));
    }
}
exports.RouteRoutes = RouteRoutes;
//# sourceMappingURL=route.routes.js.map