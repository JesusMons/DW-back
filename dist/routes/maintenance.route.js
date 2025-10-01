"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceRoute = void 0;
const maintenance_Controller_1 = require("../controller/maintenance.Controller");
class MaintenanceRoute {
    constructor() {
        this.maintenanceController = new maintenance_Controller_1.MaintenanceController();
    }
    routes(app) {
        app.route("/api/maintenances").get(this.maintenanceController.getMaintenances);
    }
}
exports.MaintenanceRoute = MaintenanceRoute;
//# sourceMappingURL=maintenance.route.js.map