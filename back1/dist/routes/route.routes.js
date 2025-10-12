"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteRoutes = void 0;
const route_controller_1 = require("../controllers/route.controller");
const auth_1 = require("../middleware/auth");
class RouteRoutes {
    constructor() {
        this.routeController = new route_controller_1.RouteController();
    }
    routes(app) {
        app
            .route("/api/routes")
            .get(auth_1.authMiddleware, this.routeController.getAllRoutes.bind(this.routeController))
            .post(auth_1.authMiddleware, this.routeController.createRoute.bind(this.routeController));
        app
            .route("/api/routes/:id")
            .get(auth_1.authMiddleware, this.routeController.getRouteById.bind(this.routeController))
            .put(auth_1.authMiddleware, this.routeController.updateRoute.bind(this.routeController))
            .delete(auth_1.authMiddleware, this.routeController.deleteRoute.bind(this.routeController));
        app
            .route("/api/routes/:id/deactivate")
            .patch(auth_1.authMiddleware, this.routeController.deleteRouteAdv.bind(this.routeController));
    }
}
exports.RouteRoutes = RouteRoutes;
//# sourceMappingURL=route.routes.js.map