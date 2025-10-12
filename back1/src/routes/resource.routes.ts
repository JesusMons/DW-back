import { Application } from "express";
import { ResourceController } from "../controllers/resource.controller";
import { authMiddleware } from "../middleware/auth";

export class ResourceRoutes {
  private readonly resourceController = new ResourceController();

  public routes(app: Application): void {
    app
      .route("/api/auth/resources")
      .get(
        authMiddleware,
        this.resourceController.getAllResources.bind(this.resourceController)
      )
      .post(
        authMiddleware,
        this.resourceController.createResource.bind(this.resourceController)
      );

    app
      .route("/api/auth/resources/:id")
      .get(
        authMiddleware,
        this.resourceController.getResourceById.bind(this.resourceController)
      )
      .put(
        authMiddleware,
        this.resourceController.updateResource.bind(this.resourceController)
      )
      .delete(
        authMiddleware,
        this.resourceController.deleteResource.bind(this.resourceController)
      );

    app
      .route("/api/auth/resources/:id/deactivate")
      .patch(
        authMiddleware,
        this.resourceController.deleteResourceAdv.bind(this.resourceController)
      );
  }
}
