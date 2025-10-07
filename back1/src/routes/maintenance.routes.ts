import { Application } from "express";
import { MaintenanceController } from "../controllers/maintenance.controller";

export class MaintenanceRoutes {
  private readonly maintenanceController = new MaintenanceController();

  public routes(app: Application): void {
    app
      .route("/api/maintenances")
      .get(this.maintenanceController.getAllMaintenances.bind(this.maintenanceController));

    app
      .route("/api/maintenances/:id")
      .get(this.maintenanceController.getMaintenanceById.bind(this.maintenanceController));
  }
}
