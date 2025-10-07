"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistanceRoutes = void 0;
const assistance_controller_1 = require("../controllers/assistance.controller");
class AssistanceRoutes {
    constructor() {
        this.assistanceController = new assistance_controller_1.AssistanceController();
    }
    routes(app) {
        app
            .route("/api/assistances")
            .get(this.assistanceController.getAllAssistances.bind(this.assistanceController));
        app
            .route("/api/assistances/:id")
            .get(this.assistanceController.getAssistanceById.bind(this.assistanceController));
    }
}
exports.AssistanceRoutes = AssistanceRoutes;
//# sourceMappingURL=assistance.routes.js.map