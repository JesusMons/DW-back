"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidenceRoutes = void 0;
const incidence_controller_1 = require("../controllers/incidence.controller");
class IncidenceRoutes {
    constructor() {
        this.incidenceController = new incidence_controller_1.IncidenceController();
    }
    routes(app) {
        app
            .route("/api/incidences")
            .get(this.incidenceController.getAllIncidences.bind(this.incidenceController));
        app
            .route("/api/incidences/:id")
            .get(this.incidenceController.getIncidenceById.bind(this.incidenceController));
    }
}
exports.IncidenceRoutes = IncidenceRoutes;
//# sourceMappingURL=incidence.routes.js.map