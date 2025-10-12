"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserRoutes = void 0;
const role_user_controller_1 = require("../controllers/role-user.controller");
const auth_1 = require("../middleware/auth");
class RoleUserRoutes {
    constructor() {
        this.roleUserController = new role_user_controller_1.RoleUserController();
    }
    routes(app) {
        app
            .route("/api/auth/role-users")
            .get(auth_1.authMiddleware, this.roleUserController.getAllRoleUsers.bind(this.roleUserController))
            .post(auth_1.authMiddleware, this.roleUserController.createRoleUser.bind(this.roleUserController));
        app
            .route("/api/auth/role-users/:id")
            .get(auth_1.authMiddleware, this.roleUserController.getRoleUserById.bind(this.roleUserController))
            .put(auth_1.authMiddleware, this.roleUserController.updateRoleUser.bind(this.roleUserController))
            .delete(auth_1.authMiddleware, this.roleUserController.deleteRoleUser.bind(this.roleUserController));
        app
            .route("/api/auth/role-users/:id/deactivate")
            .patch(auth_1.authMiddleware, this.roleUserController.deleteRoleUserAdv.bind(this.roleUserController));
    }
}
exports.RoleUserRoutes = RoleUserRoutes;
//# sourceMappingURL=role-user.routes.js.map