import { Application } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRoutes {
  private readonly userController = new UserController();

  public routes(app: Application): void {
    app
      .route("/api/auth/users")
      .get(this.userController.getAllUsers.bind(this.userController));

    app
      .route("/api/auth/users/:id")
      .get(this.userController.getUserById.bind(this.userController));
  }
}
