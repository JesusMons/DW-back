"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidenceRoute = void 0;
const incidence_Controller_1 = require("../controller/incidence.Controller");
class IncidenceRoute {
    constructor() {
        this.incidenceController = new incidence_Controller_1.IncidenceController();
    }
    routes(app) {
        app.route("/api/incidences").get(this.incidenceController.getIncidences);
    }
}
exports.IncidenceRoute = IncidenceRoute;
//# sourceMappingURL=incidence.route.js.map