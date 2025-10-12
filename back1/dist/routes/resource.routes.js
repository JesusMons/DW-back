"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRoutes = void 0;
const resource_controller_1 = require("../controllers/resource.controller");
const auth_1 = require("../middleware/auth");
class ResourceRoutes {
    constructor() {
        this.resourceController = new resource_controller_1.ResourceController();
    }
    routes(app) {
        app
            .route("/api/auth/resources")
            .get(auth_1.authMiddleware, this.resourceController.getAllResources.bind(this.resourceController))
            .post(auth_1.authMiddleware, this.resourceController.createResource.bind(this.resourceController));
        app
            .route("/api/auth/resources/:id")
            .get(auth_1.authMiddleware, this.resourceController.getResourceById.bind(this.resourceController))
            .put(auth_1.authMiddleware, this.resourceController.updateResource.bind(this.resourceController))
            .delete(auth_1.authMiddleware, this.resourceController.deleteResource.bind(this.resourceController));
        app
            .route("/api/auth/resources/:id/deactivate")
            .patch(auth_1.authMiddleware, this.resourceController.deleteResourceAdv.bind(this.resourceController));
    }
}
exports.ResourceRoutes = ResourceRoutes;
//# sourceMappingURL=resource.routes.js.map