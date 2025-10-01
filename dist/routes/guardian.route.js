"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianRoute = void 0;
const guardian_Controller_1 = require("../controller/guardian.Controller");
class GuardianRoute {
    constructor() {
        this.guardianController = new guardian_Controller_1.GuardianController();
    }
    routes(app) {
        app.route("/api/guardians").get(this.guardianController.getGuardians);
    }
}
exports.GuardianRoute = GuardianRoute;
//# sourceMappingURL=guardian.route.js.map