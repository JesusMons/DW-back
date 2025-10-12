"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidenceRoutes = void 0;
const incidence_controller_1 = require("../controllers/incidence.controller");
const auth_1 = require("../middleware/auth");
class IncidenceRoutes {
    constructor() {
        this.incidenceController = new incidence_controller_1.IncidenceController();
    }
    routes(app) {
        app
            .route("/api/incidences")
            .get(auth_1.authMiddleware, this.incidenceController.getAllIncidences.bind(this.incidenceController))
            .post(auth_1.authMiddleware, this.incidenceController.createIncidence.bind(this.incidenceController));
        app
            .route("/api/incidences/:id")
            .get(auth_1.authMiddleware, this.incidenceController.getIncidenceById.bind(this.incidenceController))
            .put(auth_1.authMiddleware, this.incidenceController.updateIncidence.bind(this.incidenceController))
            .delete(auth_1.authMiddleware, this.incidenceController.deleteIncidence.bind(this.incidenceController));
        app
            .route("/api/incidences/:id/deactivate")
            .patch(auth_1.authMiddleware, this.incidenceController.deleteIncidenceAdv.bind(this.incidenceController));
    }
}
exports.IncidenceRoutes = IncidenceRoutes;
//# sourceMappingURL=incidence.routes.js.map