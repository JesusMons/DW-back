"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRoutes = void 0;
const driver_controller_1 = require("../controllers/driver.controller");
class DriverRoutes {
    constructor() {
        this.driverController = new driver_controller_1.DriverController();
    }
    routes(app) {
        app
            .route("/api/drivers")
            .get(this.driverController.getAllDrivers.bind(this.driverController));
        app
            .route("/api/drivers/:id")
            .get(this.driverController.getDriverById.bind(this.driverController));
    }
}
exports.DriverRoutes = DriverRoutes;
//# sourceMappingURL=driver.routes.js.map