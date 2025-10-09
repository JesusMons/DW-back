import { Application } from "express";
import { ResourceRoleController } from "../controllers/resource-role.controller";

export class ResourceRoleRoutes {
  private readonly resourceRoleController = new ResourceRoleController();

  public routes(app: Application): void {
    app
      .route("/api/auth/resource-roles")
      .get(this.resourceRoleController.getAllResourceRoles.bind(this.resourceRoleController));

    app
      .route("/api/auth/resource-roles/:id")
      .get(this.resourceRoleController.getResourceRoleById.bind(this.resourceRoleController));
  }
}
