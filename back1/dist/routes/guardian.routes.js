"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianRoutes = void 0;
const guardian_controller_1 = require("../controllers/guardian.controller");
class GuardianRoutes {
    constructor() {
        this.guardianController = new guardian_controller_1.GuardianController();
    }
    routes(app) {
        app
            .route("/api/guardians")
            .get(this.guardianController.getAllGuardians.bind(this.guardianController));
        app
            .route("/api/guardians/:id")
            .get(this.guardianController.getGuardianById.bind(this.guardianController));
    }
}
exports.GuardianRoutes = GuardianRoutes;
//# sourceMappingURL=guardian.routes.js.map