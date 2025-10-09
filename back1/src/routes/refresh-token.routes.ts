import { Application } from "express";
import { RefreshTokenController } from "../controllers/refresh-token.controller";

export class RefreshTokenRoutes {
  private readonly refreshTokenController = new RefreshTokenController();

  public routes(app: Application): void {
    app
      .route("/api/auth/refresh-tokens")
      .get(this.refreshTokenController.getAllRefreshTokens.bind(this.refreshTokenController));

    app
      .route("/api/auth/refresh-tokens/:id")
      .get(this.refreshTokenController.getRefreshTokenById.bind(this.refreshTokenController));
  }
}
