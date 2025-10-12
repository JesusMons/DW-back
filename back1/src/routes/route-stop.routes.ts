import { Application } from "express";
import { RouteStopController } from "../controllers/RouteStop.Controller";
import { authMiddleware } from "../middleware/auth";

export class RouteStopRoutes {
  private readonly routeStopController = new RouteStopController();

  public routes(app: Application): void {
    app
      .route("/api/route-stops")
      .get(
        authMiddleware,
        this.routeStopController.getAllRouteStops.bind(this.routeStopController)
      )
      .post(
        authMiddleware,
        this.routeStopController.createRouteStop.bind(this.routeStopController)
      );

    app
      .route("/api/route-stops/:routeId/:stopId")
      .get(
        authMiddleware,
        this.routeStopController.getRouteStopById.bind(this.routeStopController)
      )
      .put(
        authMiddleware,
        this.routeStopController.updateRouteStop.bind(this.routeStopController)
      )
      .delete(
        authMiddleware,
        this.routeStopController.deleteRouteStop.bind(this.routeStopController)
      );

    app
      .route("/api/route-stops/:routeId/:stopId/deactivate")
      .patch(
        authMiddleware,
        this.routeStopController.deleteRouteStopAdv.bind(this.routeStopController)
      );
  }
}
