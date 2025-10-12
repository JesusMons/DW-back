"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryStopScheduleRoutes = void 0;
const ItineraryStopSchedule_Controller_1 = require("../controllers/ItineraryStopSchedule.Controller");
const auth_1 = require("../middleware/auth");
class ItineraryStopScheduleRoutes {
    constructor() {
        this.itineraryStopScheduleController = new ItineraryStopSchedule_Controller_1.ItineraryStopScheduleController();
    }
    routes(app) {
        app
            .route("/api/itinerary-stop-schedules")
            .get(auth_1.authMiddleware, this.itineraryStopScheduleController.getAllItineraryStopSchedules.bind(this.itineraryStopScheduleController))
            .post(auth_1.authMiddleware, this.itineraryStopScheduleController.createItineraryStopSchedule.bind(this.itineraryStopScheduleController));
        app
            .route("/api/itinerary-stop-schedules/:itineraryId/:stopId")
            .get(auth_1.authMiddleware, this.itineraryStopScheduleController.getItineraryStopScheduleById.bind(this.itineraryStopScheduleController))
            .put(auth_1.authMiddleware, this.itineraryStopScheduleController.updateItineraryStopSchedule.bind(this.itineraryStopScheduleController))
            .delete(auth_1.authMiddleware, this.itineraryStopScheduleController.deleteItineraryStopSchedule.bind(this.itineraryStopScheduleController));
        app
            .route("/api/itinerary-stop-schedules/:itineraryId/:stopId/deactivate")
            .patch(auth_1.authMiddleware, this.itineraryStopScheduleController.deleteItineraryStopScheduleAdv.bind(this.itineraryStopScheduleController));
    }
}
exports.ItineraryStopScheduleRoutes = ItineraryStopScheduleRoutes;
//# sourceMappingURL=itinerary-stop-schedule.routes.js.map