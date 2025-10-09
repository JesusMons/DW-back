import { Application } from "express";
import { RoleUserController } from "../controllers/role-user.controller";

export class RoleUserRoutes {
  private readonly roleUserController = new RoleUserController();

  public routes(app: Application): void {
    app
      .route("/api/auth/role-users")
      .get(this.roleUserController.getAllRoleUsers.bind(this.roleUserController));

    app
      .route("/api/auth/role-users/:id")
      .get(this.roleUserController.getRoleUserById.bind(this.roleUserController));
  }
}
