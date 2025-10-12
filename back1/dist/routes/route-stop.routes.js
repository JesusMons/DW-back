"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStopRoutes = void 0;
const RouteStop_Controller_1 = require("../controllers/RouteStop.Controller");
const auth_1 = require("../middleware/auth");
class RouteStopRoutes {
    constructor() {
        this.routeStopController = new RouteStop_Controller_1.RouteStopController();
    }
    routes(app) {
        app
            .route("/api/route-stops")
            .get(auth_1.authMiddleware, this.routeStopController.getAllRouteStops.bind(this.routeStopController))
            .post(auth_1.authMiddleware, this.routeStopController.createRouteStop.bind(this.routeStopController));
        app
            .route("/api/route-stops/:routeId/:stopId")
            .get(auth_1.authMiddleware, this.routeStopController.getRouteStopById.bind(this.routeStopController))
            .put(auth_1.authMiddleware, this.routeStopController.updateRouteStop.bind(this.routeStopController))
            .delete(auth_1.authMiddleware, this.routeStopController.deleteRouteStop.bind(this.routeStopController));
        app
            .route("/api/route-stops/:routeId/:stopId/deactivate")
            .patch(auth_1.authMiddleware, this.routeStopController.deleteRouteStopAdv.bind(this.routeStopController));
    }
}
exports.RouteStopRoutes = RouteStopRoutes;
//# sourceMappingURL=route-stop.routes.js.map