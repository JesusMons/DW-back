"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRoutes = void 0;
const resource_controller_1 = require("../controllers/resource.controller");
class ResourceRoutes {
    constructor() {
        this.resourceController = new resource_controller_1.ResourceController();
    }
    routes(app) {
        app
            .route("/api/auth/resources")
            .get(this.resourceController.getAllResources.bind(this.resourceController));
        app
            .route("/api/auth/resources/:id")
            .get(this.resourceController.getResourceById.bind(this.resourceController));
    }
}
exports.ResourceRoutes = ResourceRoutes;
//# sourceMappingURL=resource.routes.js.map