import { Application } from "express";
import { StopController } from "../controllers/stop.controller";
import { authMiddleware } from "../middleware/auth";

export class StopRoutes {
  private readonly stopController = new StopController();

  public routes(app: Application): void {
    app
      .route("/api/stops")
      .get(
        authMiddleware,
        this.stopController.getAllStops.bind(this.stopController)
      )
      .post(
        authMiddleware,
        this.stopController.createStop.bind(this.stopController)
      );

    app
      .route("/api/stops/:id")
      .get(
        authMiddleware,
        this.stopController.getStopById.bind(this.stopController)
      )
      .put(
        authMiddleware,
        this.stopController.updateStop.bind(this.stopController)
      )
      .delete(
        authMiddleware,
        this.stopController.deleteStop.bind(this.stopController)
      );

    app
      .route("/api/stops/:id/deactivate")
      .patch(
        authMiddleware,
        this.stopController.deleteStopAdv.bind(this.stopController)
      );
  }
}
