"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryRoutes = void 0;
const itinerary_controller_1 = require("../controllers/itinerary.controller");
const auth_1 = require("../middleware/auth");
class ItineraryRoutes {
    constructor() {
        this.itineraryController = new itinerary_controller_1.ItineraryController();
    }
    routes(app) {
        app
            .route("/api/itineraries")
            .get(auth_1.authMiddleware, this.itineraryController.getAllItineraries.bind(this.itineraryController))
            .post(auth_1.authMiddleware, this.itineraryController.createItinerary.bind(this.itineraryController));
        app
            .route("/api/itineraries/:id")
            .get(auth_1.authMiddleware, this.itineraryController.getItineraryById.bind(this.itineraryController))
            .put(auth_1.authMiddleware, this.itineraryController.updateItinerary.bind(this.itineraryController))
            .delete(auth_1.authMiddleware, this.itineraryController.deleteItinerary.bind(this.itineraryController));
        app
            .route("/api/itineraries/:id/deactivate")
            .patch(auth_1.authMiddleware, this.itineraryController.deleteItineraryAdv.bind(this.itineraryController));
    }
}
exports.ItineraryRoutes = ItineraryRoutes;
//# sourceMappingURL=itinerary.routes.js.map