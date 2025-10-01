"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopRoute = void 0;
const stop_Controller_1 = require("../controller/stop.Controller");
class StopRoute {
    constructor() {
        this.stopController = new stop_Controller_1.StopController();
    }
    routes(app) {
        app.route("/api/stops").get(this.stopController.getStops);
    }
}
exports.StopRoute = StopRoute;
//# sourceMappingURL=stop.route.js.map