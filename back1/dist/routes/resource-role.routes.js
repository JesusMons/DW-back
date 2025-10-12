"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRoleRoutes = void 0;
const resource_role_controller_1 = require("../controllers/resource-role.controller");
const auth_1 = require("../middleware/auth");
class ResourceRoleRoutes {
    constructor() {
        this.resourceRoleController = new resource_role_controller_1.ResourceRoleController();
    }
    routes(app) {
        app
            .route("/api/auth/resource-roles")
            .get(auth_1.authMiddleware, this.resourceRoleController.getAllResourceRoles.bind(this.resourceRoleController))
            .post(auth_1.authMiddleware, this.resourceRoleController.createResourceRole.bind(this.resourceRoleController));
        app
            .route("/api/auth/resource-roles/:id")
            .get(auth_1.authMiddleware, this.resourceRoleController.getResourceRoleById.bind(this.resourceRoleController))
            .put(auth_1.authMiddleware, this.resourceRoleController.updateResourceRole.bind(this.resourceRoleController))
            .delete(auth_1.authMiddleware, this.resourceRoleController.deleteResourceRole.bind(this.resourceRoleController));
        app
            .route("/api/auth/resource-roles/:id/deactivate")
            .patch(auth_1.authMiddleware, this.resourceRoleController.deleteResourceRoleAdv.bind(this.resourceRoleController));
    }
}
exports.ResourceRoleRoutes = ResourceRoleRoutes;
//# sourceMappingURL=resource-role.routes.js.map