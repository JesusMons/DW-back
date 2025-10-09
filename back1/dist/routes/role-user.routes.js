"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserRoutes = void 0;
const role_user_controller_1 = require("../controllers/role-user.controller");
class RoleUserRoutes {
    constructor() {
        this.roleUserController = new role_user_controller_1.RoleUserController();
    }
    routes(app) {
        app
            .route("/api/auth/role-users")
            .get(this.roleUserController.getAllRoleUsers.bind(this.roleUserController));
        app
            .route("/api/auth/role-users/:id")
            .get(this.roleUserController.getRoleUserById.bind(this.roleUserController));
    }
}
exports.RoleUserRoutes = RoleUserRoutes;
//# sourceMappingURL=role-user.routes.js.map