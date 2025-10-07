"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceRoutes = void 0;
const maintenance_controller_1 = require("../controllers/maintenance.controller");
class MaintenanceRoutes {
    constructor() {
        this.maintenanceController = new maintenance_controller_1.MaintenanceController();
    }
    routes(app) {
        app
            .route("/api/maintenances")
            .get(this.maintenanceController.getAllMaintenances.bind(this.maintenanceController));
        app
            .route("/api/maintenances/:id")
            .get(this.maintenanceController.getMaintenanceById.bind(this.maintenanceController));
    }
}
exports.MaintenanceRoutes = MaintenanceRoutes;
//# sourceMappingURL=maintenance.routes.js.map