import { Application } from "express";
import { RoleUserController } from "../controllers/role-user.controller";
import { authMiddleware } from "../middleware/auth";

export class RoleUserRoutes {
  private readonly roleUserController = new RoleUserController();

  public routes(app: Application): void {
    app
      .route("/api/auth/role-users")
      .get(
        authMiddleware,
        this.roleUserController.getAllRoleUsers.bind(this.roleUserController)
      )
      .post(
        authMiddleware,
        this.roleUserController.createRoleUser.bind(this.roleUserController)
      );

    app
      .route("/api/auth/role-users/:id")
      .get(
        authMiddleware,
        this.roleUserController.getRoleUserById.bind(this.roleUserController)
      )
      .put(
        authMiddleware,
        this.roleUserController.updateRoleUser.bind(this.roleUserController)
      )
      .delete(
        authMiddleware,
        this.roleUserController.deleteRoleUser.bind(this.roleUserController)
      );

    app
      .route("/api/auth/role-users/:id/deactivate")
      .patch(
        authMiddleware,
        this.roleUserController.deleteRoleUserAdv.bind(this.roleUserController)
      );
  }
}
