"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const role_controller_1 = require("../controllers/role.controller");
class RoleRoutes {
    constructor() {
        this.roleController = new role_controller_1.RoleController();
    }
    routes(app) {
        app
            .route("/api/auth/roles")
            .get(this.roleController.getAllRoles.bind(this.roleController));
        app
            .route("/api/auth/roles/:id")
            .get(this.roleController.getRoleById.bind(this.roleController));
    }
}
exports.RoleRoutes = RoleRoutes;
//# sourceMappingURL=role.routes.js.map