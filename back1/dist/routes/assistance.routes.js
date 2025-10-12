"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistanceRoutes = void 0;
const assistance_controller_1 = require("../controllers/assistance.controller");
const auth_1 = require("../middleware/auth");
class AssistanceRoutes {
    constructor() {
        this.assistanceController = new assistance_controller_1.AssistanceController();
    }
    routes(app) {
        app
            .route("/api/assistances")
            .get(auth_1.authMiddleware, this.assistanceController.getAllAssistances.bind(this.assistanceController))
            .post(auth_1.authMiddleware, this.assistanceController.createAssistance.bind(this.assistanceController));
        app
            .route("/api/assistances/:id")
            .get(auth_1.authMiddleware, this.assistanceController.getAssistanceById.bind(this.assistanceController))
            .put(auth_1.authMiddleware, this.assistanceController.updateAssistance.bind(this.assistanceController))
            .delete(auth_1.authMiddleware, this.assistanceController.deleteAssistance.bind(this.assistanceController));
        app
            .route("/api/assistances/:id/deactivate")
            .patch(auth_1.authMiddleware, this.assistanceController.deleteAssistanceAdv.bind(this.assistanceController));
    }
}
exports.AssistanceRoutes = AssistanceRoutes;
//# sourceMappingURL=assistance.routes.js.map