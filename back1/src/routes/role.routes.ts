import { Application } from "express";
import { RoleController } from "../controllers/role.controller";
import { authMiddleware } from "../middleware/auth";

export class RoleRoutes {
  private readonly roleController = new RoleController();

  public routes(app: Application): void {
    app
      .route("/api/auth/roles")
      .get(
        authMiddleware,
        this.roleController.getAllRoles.bind(this.roleController)
      )
      .post(
        authMiddleware,
        this.roleController.createRole.bind(this.roleController)
      );

    app
      .route("/api/auth/roles/:id")
      .get(
        authMiddleware,
        this.roleController.getRoleById.bind(this.roleController)
      )
      .put(
        authMiddleware,
        this.roleController.updateRole.bind(this.roleController)
      )
      .delete(
        authMiddleware,
        this.roleController.deleteRole.bind(this.roleController)
      );

    app
      .route("/api/auth/roles/:id/deactivate")
      .patch(
        authMiddleware,
        this.roleController.deleteRoleAdv.bind(this.roleController)
      );
  }
}
