import { Application } from "express";
import { DriverController } from "../controllers/driver.controller";

export class DriverRoutes {
  private readonly driverController = new DriverController();

  public routes(app: Application): void {
    app
      .route("/api/drivers")
      .get(this.driverController.getAllDrivers.bind(this.driverController));

    app
      .route("/api/drivers/:id")
      .get(this.driverController.getDriverById.bind(this.driverController));
  }
}
