"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRoute = void 0;
const driver_Controller_1 = require("../controller/driver.Controller");
class DriverRoute {
    constructor() {
        this.driverController = new driver_Controller_1.DriverController();
    }
    routes(app) {
        app.route("/api/drivers").get(this.driverController.getDrivers);
    }
}
exports.DriverRoute = DriverRoute;
//# sourceMappingURL=driver.route.js.map