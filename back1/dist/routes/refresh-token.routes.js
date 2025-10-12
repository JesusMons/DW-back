"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRoutes = void 0;
const refresh_token_controller_1 = require("../controllers/refresh-token.controller");
const auth_1 = require("../middleware/auth");
class RefreshTokenRoutes {
    constructor() {
        this.refreshTokenController = new refresh_token_controller_1.RefreshTokenController();
    }
    routes(app) {
        app
            .route("/api/auth/refresh-tokens")
            .get(auth_1.authMiddleware, this.refreshTokenController.getAllRefreshTokens.bind(this.refreshTokenController))
            .post(auth_1.authMiddleware, this.refreshTokenController.createRefreshToken.bind(this.refreshTokenController));
        app
            .route("/api/auth/refresh-tokens/:id")
            .get(auth_1.authMiddleware, this.refreshTokenController.getRefreshTokenById.bind(this.refreshTokenController))
            .put(auth_1.authMiddleware, this.refreshTokenController.updateRefreshToken.bind(this.refreshTokenController))
            .delete(auth_1.authMiddleware, this.refreshTokenController.deleteRefreshToken.bind(this.refreshTokenController));
        app
            .route("/api/auth/refresh-tokens/:id/deactivate")
            .patch(auth_1.authMiddleware, this.refreshTokenController.deleteRefreshTokenAdv.bind(this.refreshTokenController));
    }
}
exports.RefreshTokenRoutes = RefreshTokenRoutes;
//# sourceMappingURL=refresh-token.routes.js.map