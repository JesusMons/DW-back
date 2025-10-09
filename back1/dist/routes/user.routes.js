"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        app
            .route("/api/auth/users")
            .get(this.userController.getAllUsers.bind(this.userController));
        app
            .route("/api/auth/users/:id")
            .get(this.userController.getUserById.bind(this.userController));
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map