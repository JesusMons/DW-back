import { Application } from "express";
import { RouteController } from "../controllers/route.controller";
import { authMiddleware } from "../middleware/auth";

export class RouteRoutes {
  private readonly routeController = new RouteController();

  public routes(app: Application): void {
    app
      .route("/api/routes")
      .get(
        authMiddleware,
        this.routeController.getAllRoutes.bind(this.routeController)
      )
      .post(
        authMiddleware,
        this.routeController.createRoute.bind(this.routeController)
      );

    app
      .route("/api/routes/:id")
      .get(
        authMiddleware,
        this.routeController.getRouteById.bind(this.routeController)
      )
      .put(
        authMiddleware,
        this.routeController.updateRoute.bind(this.routeController)
      )
      .delete(
        authMiddleware,
        this.routeController.deleteRoute.bind(this.routeController)
      );

    app
      .route("/api/routes/:id/deactivate")
      .patch(
        authMiddleware,
        this.routeController.deleteRouteAdv.bind(this.routeController)
      );
  }
}
