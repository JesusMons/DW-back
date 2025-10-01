"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRoute = void 0;
const bus_Controller_1 = require("../controller/bus.Controller");
class BusRoute {
    constructor() {
        this.busController = new bus_Controller_1.BusController();
    }
    routes(app) {
        app.route("/api/buses").get(this.busController.getBuses);
    }
}
exports.BusRoute = BusRoute;
//# sourceMappingURL=bus.route.js.map