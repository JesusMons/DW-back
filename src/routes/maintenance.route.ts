import { Application } from "express";
import { MaintenanceController } from "../controller/maintenance.Controller";

export class MaintenanceRoute {
  public maintenanceController: MaintenanceController = new MaintenanceController();

  public routes(app: Application): void {
    app.route("/api/maintenances").get(this.maintenanceController.getMaintenances);
  }
}
