"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRoleRoutes = void 0;
const resource_role_controller_1 = require("../controllers/resource-role.controller");
class ResourceRoleRoutes {
    constructor() {
        this.resourceRoleController = new resource_role_controller_1.ResourceRoleController();
    }
    routes(app) {
        app
            .route("/api/auth/resource-roles")
            .get(this.resourceRoleController.getAllResourceRoles.bind(this.resourceRoleController));
        app
            .route("/api/auth/resource-roles/:id")
            .get(this.resourceRoleController.getResourceRoleById.bind(this.resourceRoleController));
    }
}
exports.ResourceRoleRoutes = ResourceRoleRoutes;
//# sourceMappingURL=resource-role.routes.js.map