import { Application } from "express";
import { RouteAssignmentController } from "../controller/routeAssignment.Controller";

export class RouteAssignmentRoute {
  public routeAssignmentController: RouteAssignmentController = new RouteAssignmentController();

  public routes(app: Application): void {
    app.route("/api/route-assignments").get(this.routeAssignmentController.getAssignments);
  }
}
