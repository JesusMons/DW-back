"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStopRoutes = void 0;
const RouteStop_Controller_1 = require("../controllers/RouteStop.Controller");
class RouteStopRoutes {
    constructor() {
        this.routeStopController = new RouteStop_Controller_1.RouteStopController();
    }
    routes(app) {
        app
            .route("/api/route-stops")
            .get(this.routeStopController.getAllRouteStops.bind(this.routeStopController));
        app
            .route("/api/route-stops/:routeId/:stopId")
            .get(this.routeStopController.getRouteStopById.bind(this.routeStopController));
    }
}
exports.RouteStopRoutes = RouteStopRoutes;
//# sourceMappingURL=route-stop.routes.js.map