import { Application } from "express";
import { BusController } from "../controller/bus.Controller";

export class BusRoute {
  public busController: BusController = new BusController();

  public routes(app: Application): void {
    app.route("/api/buses").get(this.busController.getBuses);
  }
}
