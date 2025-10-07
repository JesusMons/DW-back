import { Application } from "express";
import { RouteStopController } from "../controllers/RouteStop.Controller";

export class RouteStopRoutes {
  private readonly routeStopController = new RouteStopController();

  public routes(app: Application): void {
    app
      .route("/api/route-stops")
      .get(this.routeStopController.getAllRouteStops.bind(this.routeStopController));

    app
      .route("/api/route-stops/:routeId/:stopId")
      .get(this.routeStopController.getRouteStopById.bind(this.routeStopController));
  }
}
