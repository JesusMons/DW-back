import { Application } from "express";
import { RouteAssignmentController } from "../controllers/routeAssignment.Controller";

export class RouteAssignmentRoutes {
  private readonly routeAssignmentController = new RouteAssignmentController();

  public routes(app: Application): void {
    app
      .route("/api/route-assignments")
      .get(this.routeAssignmentController.getAllRouteAssignments.bind(this.routeAssignmentController));

    app
      .route("/api/route-assignments/:id")
      .get(this.routeAssignmentController.getRouteAssignmentById.bind(this.routeAssignmentController));
  }
}
