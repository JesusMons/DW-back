import { Application } from "express";
import { RouteAssignmentController } from "../controllers/routeAssignment.Controller";
import { authMiddleware } from "../middleware/auth";

export class RouteAssignmentRoutes {
  private readonly routeAssignmentController =
    new RouteAssignmentController();

  public routes(app: Application): void {
    app
      .route("/api/route-assignments")
      .get(
        authMiddleware,
        this.routeAssignmentController.getAllRouteAssignments.bind(
          this.routeAssignmentController
        )
      )
      .post(
        authMiddleware,
        this.routeAssignmentController.createRouteAssignment.bind(
          this.routeAssignmentController
        )
      );

    app
      .route("/api/route-assignments/:id")
      .get(
        authMiddleware,
        this.routeAssignmentController.getRouteAssignmentById.bind(
          this.routeAssignmentController
        )
      )
      .put(
        authMiddleware,
        this.routeAssignmentController.updateRouteAssignment.bind(
          this.routeAssignmentController
        )
      )
      .delete(
        authMiddleware,
        this.routeAssignmentController.deleteRouteAssignment.bind(
          this.routeAssignmentController
        )
      );

    app
      .route("/api/route-assignments/:id/deactivate")
      .patch(
        authMiddleware,
        this.routeAssignmentController.deleteRouteAssignmentAdv.bind(
          this.routeAssignmentController
        )
      );
  }
}
