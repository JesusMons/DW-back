"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRoutes = void 0;
const refresh_token_controller_1 = require("../controllers/refresh-token.controller");
class RefreshTokenRoutes {
    constructor() {
        this.refreshTokenController = new refresh_token_controller_1.RefreshTokenController();
    }
    routes(app) {
        app
            .route("/api/auth/refresh-tokens")
            .get(this.refreshTokenController.getAllRefreshTokens.bind(this.refreshTokenController));
        app
            .route("/api/auth/refresh-tokens/:id")
            .get(this.refreshTokenController.getRefreshTokenById.bind(this.refreshTokenController));
    }
}
exports.RefreshTokenRoutes = RefreshTokenRoutes;
//# sourceMappingURL=refresh-token.routes.js.map