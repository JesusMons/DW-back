import { Application } from "express";
import { StopController } from "../controllers/stop.controller";

export class StopRoutes {
  private readonly stopController = new StopController();

  public routes(app: Application): void {
    app
      .route("/api/stops")
      .get(this.stopController.getAllStops.bind(this.stopController));

    app
      .route("/api/stops/:id")
      .get(this.stopController.getStopById.bind(this.stopController));
  }
}
