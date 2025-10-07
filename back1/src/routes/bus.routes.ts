import { Application } from "express";
import { BusController } from "../controllers/bus.controller";

export class BusRoutes {
  private readonly busController = new BusController();

  public routes(app: Application): void {
    app
      .route("/api/buses")
      .get(this.busController.getAllBuses.bind(this.busController));

    app
      .route("/api/buses/:id")
      .get(this.busController.getBusById.bind(this.busController));
  }
}
