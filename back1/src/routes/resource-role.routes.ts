import { Application } from "express";
import { ResourceRoleController } from "../controllers/resource-role.controller";
import { authMiddleware } from "../middleware/auth";

export class ResourceRoleRoutes {
  private readonly resourceRoleController = new ResourceRoleController();

  public routes(app: Application): void {
    app
      .route("/api/auth/resource-roles")
      .get(
        authMiddleware,
        this.resourceRoleController.getAllResourceRoles.bind(
          this.resourceRoleController
        )
      )
      .post(
        authMiddleware,
        this.resourceRoleController.createResourceRole.bind(
          this.resourceRoleController
        )
      );

    app
      .route("/api/auth/resource-roles/:id")
      .get(
        authMiddleware,
        this.resourceRoleController.getResourceRoleById.bind(
          this.resourceRoleController
        )
      )
      .put(
        authMiddleware,
        this.resourceRoleController.updateResourceRole.bind(
          this.resourceRoleController
        )
      )
      .delete(
        authMiddleware,
        this.resourceRoleController.deleteResourceRole.bind(
          this.resourceRoleController
        )
      );

    app
      .route("/api/auth/resource-roles/:id/deactivate")
      .patch(
        authMiddleware,
        this.resourceRoleController.deleteResourceRoleAdv.bind(
          this.resourceRoleController
        )
      );
  }
}
