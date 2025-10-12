import { Application } from "express";
import { MaintenanceController } from "../controllers/maintenance.controller";
import { authMiddleware } from "../middleware/auth";

export class MaintenanceRoutes {
  private readonly maintenanceController = new MaintenanceController();

  public routes(app: Application): void {
    app
      .route("/api/maintenances")
      .get(
        authMiddleware,
        this.maintenanceController.getAllMaintenances.bind(
          this.maintenanceController
        )
      )
      .post(
        authMiddleware,
        this.maintenanceController.createMaintenance.bind(
          this.maintenanceController
        )
      );

    app
      .route("/api/maintenances/:id")
      .get(
        authMiddleware,
        this.maintenanceController.getMaintenanceById.bind(
          this.maintenanceController
        )
      )
      .put(
        authMiddleware,
        this.maintenanceController.updateMaintenance.bind(
          this.maintenanceController
        )
      )
      .delete(
        authMiddleware,
        this.maintenanceController.deleteMaintenance.bind(
          this.maintenanceController
        )
      );

    app
      .route("/api/maintenances/:id/deactivate")
      .patch(
        authMiddleware,
        this.maintenanceController.deleteMaintenanceAdv.bind(
          this.maintenanceController
        )
      );
  }
}
