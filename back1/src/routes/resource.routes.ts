import { Application } from "express";
import { ResourceController } from "../controllers/resource.controller";

export class ResourceRoutes {
  private readonly resourceController = new ResourceController();

  public routes(app: Application): void {
    app
      .route("/api/auth/resources")
      .get(this.resourceController.getAllResources.bind(this.resourceController));

    app
      .route("/api/auth/resources/:id")
      .get(this.resourceController.getResourceById.bind(this.resourceController));
  }
}
