import { Application } from "express";
import { RouteController } from "../controller/route.Controller";

export class RouteRoute {
  public routeController: RouteController = new RouteController();

  public routes(app: Application): void {
    app.route("/api/routes").get(this.routeController.getRoutes);
  }
}
