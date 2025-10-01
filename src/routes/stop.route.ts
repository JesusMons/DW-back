import { Application } from "express";
import { StopController } from "../controller/stop.Controller";

export class StopRoute {
  public stopController: StopController = new StopController();

  public routes(app: Application): void {
    app.route("/api/stops").get(this.stopController.getStops);
  }
}
