import { Application } from "express";
import { DriverController } from "../controller/driver.Controller";

export class DriverRoute {
  public driverController: DriverController = new DriverController();

  public routes(app: Application): void {
    app.route("/api/drivers").get(this.driverController.getDrivers);
  }
}
