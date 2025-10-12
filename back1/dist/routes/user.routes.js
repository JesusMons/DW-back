"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
class UserRoutes {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        app
            .route("/api/auth/users")
            .get(auth_1.authMiddleware, this.userController.getAllUsers.bind(this.userController))
            .post(auth_1.authMiddleware, this.userController.createUser.bind(this.userController));
        app
            .route("/api/auth/users/:id")
            .get(auth_1.authMiddleware, this.userController.getUserById.bind(this.userController))
            .put(auth_1.authMiddleware, this.userController.updateUser.bind(this.userController))
            .delete(auth_1.authMiddleware, this.userController.deleteUser.bind(this.userController));
        app
            .route("/api/auth/users/:id/deactivate")
            .patch(auth_1.authMiddleware, this.userController.deleteUserAdv.bind(this.userController));
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map