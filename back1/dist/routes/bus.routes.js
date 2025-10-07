"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRoutes = void 0;
const bus_controller_1 = require("../controllers/bus.controller");
class BusRoutes {
    constructor() {
        this.busController = new bus_controller_1.BusController();
    }
    routes(app) {
        app
            .route("/api/buses")
            .get(this.busController.getAllBuses.bind(this.busController));
        app
            .route("/api/buses/:id")
            .get(this.busController.getBusById.bind(this.busController));
    }
}
exports.BusRoutes = BusRoutes;
//# sourceMappingURL=bus.routes.js.map