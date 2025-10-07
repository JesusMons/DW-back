import { Application } from "express";
import { RouteController } from "../controllers/route.controller";

export class RouteRoutes {
  private readonly routeController = new RouteController();

  public routes(app: Application): void {
    app
      .route("/api/routes")
      .get(this.routeController.getAllRoutes.bind(this.routeController));

    app
      .route("/api/routes/:id")
      .get(this.routeController.getRouteById.bind(this.routeController));
  }
}
