"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const role_controller_1 = require("../controllers/role.controller");
const auth_1 = require("../middleware/auth");
class RoleRoutes {
    constructor() {
        this.roleController = new role_controller_1.RoleController();
    }
    routes(app) {
        app
            .route("/api/auth/roles")
            .get(auth_1.authMiddleware, this.roleController.getAllRoles.bind(this.roleController))
            .post(auth_1.authMiddleware, this.roleController.createRole.bind(this.roleController));
        app
            .route("/api/auth/roles/:id")
            .get(auth_1.authMiddleware, this.roleController.getRoleById.bind(this.roleController))
            .put(auth_1.authMiddleware, this.roleController.updateRole.bind(this.roleController))
            .delete(auth_1.authMiddleware, this.roleController.deleteRole.bind(this.roleController));
        app
            .route("/api/auth/roles/:id/deactivate")
            .patch(auth_1.authMiddleware, this.roleController.deleteRoleAdv.bind(this.roleController));
    }
}
exports.RoleRoutes = RoleRoutes;
//# sourceMappingURL=role.routes.js.map