"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianRoutes = void 0;
const guardian_controller_1 = require("../controllers/guardian.controller");
const auth_1 = require("../middleware/auth");
class GuardianRoutes {
    constructor() {
        this.guardianController = new guardian_controller_1.GuardianController();
    }
    routes(app) {
        app
            .route("/api/guardians")
            .get(auth_1.authMiddleware, this.guardianController.getAllGuardians.bind(this.guardianController))
            .post(auth_1.authMiddleware, this.guardianController.createGuardian.bind(this.guardianController));
        app
            .route("/api/guardians/:id")
            .get(auth_1.authMiddleware, this.guardianController.getGuardianById.bind(this.guardianController))
            .put(auth_1.authMiddleware, this.guardianController.updateGuardian.bind(this.guardianController))
            .delete(auth_1.authMiddleware, this.guardianController.deleteGuardian.bind(this.guardianController));
        app
            .route("/api/guardians/:id/deactivate")
            .patch(auth_1.authMiddleware, this.guardianController.deleteGuardianAdv.bind(this.guardianController));
    }
}
exports.GuardianRoutes = GuardianRoutes;
//# sourceMappingURL=guardian.routes.js.map