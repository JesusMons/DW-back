"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceRoutes = void 0;
const maintenance_controller_1 = require("../controllers/maintenance.controller");
const auth_1 = require("../middleware/auth");
class MaintenanceRoutes {
    constructor() {
        this.maintenanceController = new maintenance_controller_1.MaintenanceController();
    }
    routes(app) {
        app
            .route("/api/maintenances")
            .get(auth_1.authMiddleware, this.maintenanceController.getAllMaintenances.bind(this.maintenanceController))
            .post(auth_1.authMiddleware, this.maintenanceController.createMaintenance.bind(this.maintenanceController));
        app
            .route("/api/maintenances/:id")
            .get(auth_1.authMiddleware, this.maintenanceController.getMaintenanceById.bind(this.maintenanceController))
            .put(auth_1.authMiddleware, this.maintenanceController.updateMaintenance.bind(this.maintenanceController))
            .delete(auth_1.authMiddleware, this.maintenanceController.deleteMaintenance.bind(this.maintenanceController));
        app
            .route("/api/maintenances/:id/deactivate")
            .patch(auth_1.authMiddleware, this.maintenanceController.deleteMaintenanceAdv.bind(this.maintenanceController));
    }
}
exports.MaintenanceRoutes = MaintenanceRoutes;
//# sourceMappingURL=maintenance.routes.js.map