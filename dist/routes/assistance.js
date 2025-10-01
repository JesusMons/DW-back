"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistanceRoute = void 0;
const assistance_controller_1 = require("../controller/assistance.controller");
class AssistanceRoute {
    constructor() {
        this.assistenaceController = new assistance_controller_1.assistenaceController();
    }
    routes(app) {
        app.route("/api/assistances").get(this.assistenaceController.getAssistenace);
    }
}
exports.AssistanceRoute = AssistanceRoute;
//# sourceMappingURL=assistance.js.map