"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryRoutes = void 0;
const itinerary_controller_1 = require("../controllers/itinerary.controller");
class ItineraryRoutes {
    constructor() {
        this.itineraryController = new itinerary_controller_1.ItineraryController();
    }
    routes(app) {
        app
            .route("/api/itineraries")
            .get(this.itineraryController.getAllItineraries.bind(this.itineraryController));
        app
            .route("/api/itineraries/:id")
            .get(this.itineraryController.getItineraryById.bind(this.itineraryController));
    }
}
exports.ItineraryRoutes = ItineraryRoutes;
//# sourceMappingURL=itinerary.routes.js.map