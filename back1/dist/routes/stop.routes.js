"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopRoutes = void 0;
const stop_controller_1 = require("../controllers/stop.controller");
const auth_1 = require("../middleware/auth");
class StopRoutes {
    constructor() {
        this.stopController = new stop_controller_1.StopController();
    }
    routes(app) {
        app
            .route("/api/stops")
            .get(auth_1.authMiddleware, this.stopController.getAllStops.bind(this.stopController))
            .post(auth_1.authMiddleware, this.stopController.createStop.bind(this.stopController));
        app
            .route("/api/stops/:id")
            .get(auth_1.authMiddleware, this.stopController.getStopById.bind(this.stopController))
            .put(auth_1.authMiddleware, this.stopController.updateStop.bind(this.stopController))
            .delete(auth_1.authMiddleware, this.stopController.deleteStop.bind(this.stopController));
        app
            .route("/api/stops/:id/deactivate")
            .patch(auth_1.authMiddleware, this.stopController.deleteStopAdv.bind(this.stopController));
    }
}
exports.StopRoutes = StopRoutes;
//# sourceMappingURL=stop.routes.js.map