import { Application } from "express";
import { RefreshTokenController } from "../controllers/refresh-token.controller";
import { authMiddleware } from "../middleware/auth";

export class RefreshTokenRoutes {
  private readonly refreshTokenController = new RefreshTokenController();

  public routes(app: Application): void {
    app
      .route("/api/auth/refresh-tokens")
      .get(
        authMiddleware,
        this.refreshTokenController.getAllRefreshTokens.bind(
          this.refreshTokenController
        )
      )
      .post(
        authMiddleware,
        this.refreshTokenController.createRefreshToken.bind(
          this.refreshTokenController
        )
      );

    app
      .route("/api/auth/refresh-tokens/:id")
      .get(
        authMiddleware,
        this.refreshTokenController.getRefreshTokenById.bind(
          this.refreshTokenController
        )
      )
      .put(
        authMiddleware,
        this.refreshTokenController.updateRefreshToken.bind(
          this.refreshTokenController
        )
      )
      .delete(
        authMiddleware,
        this.refreshTokenController.deleteRefreshToken.bind(
          this.refreshTokenController
        )
      );

    app
      .route("/api/auth/refresh-tokens/:id/deactivate")
      .patch(
        authMiddleware,
        this.refreshTokenController.deleteRefreshTokenAdv.bind(
          this.refreshTokenController
        )
      );
  }
}
