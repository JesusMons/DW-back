"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryRoute = void 0;
const itinerary_Controller_1 = require("../controller/itinerary.Controller");
class ItineraryRoute {
    constructor() {
        this.itineraryController = new itinerary_Controller_1.ItineraryController();
    }
    routes(app) {
        app.route("/api/itineraries").get(this.itineraryController.getItineraries);
    }
}
exports.ItineraryRoute = ItineraryRoute;
//# sourceMappingURL=itinerary.route.js.map