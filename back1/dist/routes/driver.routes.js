"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRoutes = void 0;
const driver_controller_1 = require("../controllers/driver.controller");
const auth_1 = require("../middleware/auth");
class DriverRoutes {
    constructor() {
        this.driverController = new driver_controller_1.DriverController();
    }
    routes(app) {
        app
            .route("/api/drivers")
            .get(auth_1.authMiddleware, this.driverController.getAllDrivers.bind(this.driverController))
            .post(auth_1.authMiddleware, this.driverController.createDriver.bind(this.driverController));
        app
            .route("/api/drivers/:id")
            .get(auth_1.authMiddleware, this.driverController.getDriverById.bind(this.driverController))
            .put(auth_1.authMiddleware, this.driverController.updateDriver.bind(this.driverController))
            .delete(auth_1.authMiddleware, this.driverController.deleteDriver.bind(this.driverController));
        app
            .route("/api/drivers/:id/deactivate")
            .patch(auth_1.authMiddleware, this.driverController.deleteDriverAdv.bind(this.driverController));
    }
}
exports.DriverRoutes = DriverRoutes;
//# sourceMappingURL=driver.routes.js.map