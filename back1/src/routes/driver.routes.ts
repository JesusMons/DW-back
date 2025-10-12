import { Application } from "express";
import { DriverController } from "../controllers/driver.controller";
import { authMiddleware } from "../middleware/auth";

export class DriverRoutes {
  private readonly driverController = new DriverController();

  public routes(app: Application): void {
    app
      .route("/api/drivers")
      .get(authMiddleware, this.driverController.getAllDrivers.bind(this.driverController))
      .post(authMiddleware, this.driverController.createDriver.bind(this.driverController));

    app
      .route("/api/drivers/:id")
      .get(authMiddleware, this.driverController.getDriverById.bind(this.driverController))
      .put(authMiddleware, this.driverController.updateDriver.bind(this.driverController))
      .delete(authMiddleware, this.driverController.deleteDriver.bind(this.driverController));

    app
      .route("/api/drivers/:id/deactivate")
      .patch(authMiddleware, this.driverController.deleteDriverAdv.bind(this.driverController));
  }
}
