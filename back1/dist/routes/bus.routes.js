"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRoutes = void 0;
const bus_controller_1 = require("../controllers/bus.controller");
const auth_1 = require("../middleware/auth");
class BusRoutes {
    constructor() {
        this.busController = new bus_controller_1.BusController();
    }
    routes(app) {
        app
            .route("/api/buses")
            .get(auth_1.authMiddleware, this.busController.getAllBuses.bind(this.busController))
            .post(auth_1.authMiddleware, this.busController.createBus.bind(this.busController));
        app
            .route("/api/buses/:id")
            .get(auth_1.authMiddleware, this.busController.getBusById.bind(this.busController))
            .put(auth_1.authMiddleware, this.busController.updateBus.bind(this.busController))
            .delete(auth_1.authMiddleware, this.busController.deleteBus.bind(this.busController));
        app
            .route("/api/buses/:id/deactivate")
            .patch(auth_1.authMiddleware, this.busController.deleteBusAdv.bind(this.busController));
    }
}
exports.BusRoutes = BusRoutes;
//# sourceMappingURL=bus.routes.js.map