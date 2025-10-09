import { Application } from "express";
import { RoleController } from "../controllers/role.controller";

export class RoleRoutes {
  private readonly roleController = new RoleController();

  public routes(app: Application): void {
    app
      .route("/api/auth/roles")
      .get(this.roleController.getAllRoles.bind(this.roleController));

    app
      .route("/api/auth/roles/:id")
      .get(this.roleController.getRoleById.bind(this.roleController));
  }
}
