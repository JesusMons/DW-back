import { Application } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";

export class UserRoutes {
  private readonly userController = new UserController();

  public routes(app: Application): void {
    app
      .route("/api/auth/users")
      .get(
        authMiddleware,
        this.userController.getAllUsers.bind(this.userController)
      )
      .post(
        authMiddleware,
        this.userController.createUser.bind(this.userController)
      );

    app
      .route("/api/auth/users/:id")
      .get(
        authMiddleware,
        this.userController.getUserById.bind(this.userController)
      )
      .put(
        authMiddleware,
        this.userController.updateUser.bind(this.userController)
      )
      .delete(
        authMiddleware,
        this.userController.deleteUser.bind(this.userController)
      );

    app
      .route("/api/auth/users/:id/deactivate")
      .patch(
        authMiddleware,
        this.userController.deleteUserAdv.bind(this.userController)
      );
  }
}
