"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopRoutes = void 0;
const stop_controller_1 = require("../controllers/stop.controller");
class StopRoutes {
    constructor() {
        this.stopController = new stop_controller_1.StopController();
    }
    routes(app) {
        app
            .route("/api/stops")
            .get(this.stopController.getAllStops.bind(this.stopController));
        app
            .route("/api/stops/:id")
            .get(this.stopController.getStopById.bind(this.stopController));
    }
}
exports.StopRoutes = StopRoutes;
//# sourceMappingURL=stop.routes.js.map