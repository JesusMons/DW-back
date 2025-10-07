"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryStopScheduleRoutes = void 0;
const ItineraryStopSchedule_Controller_1 = require("../controllers/ItineraryStopSchedule.Controller");
class ItineraryStopScheduleRoutes {
    constructor() {
        this.itineraryStopScheduleController = new ItineraryStopSchedule_Controller_1.ItineraryStopScheduleController();
    }
    routes(app) {
        app
            .route("/api/itinerary-stop-schedules")
            .get(this.itineraryStopScheduleController.getAllItineraryStopSchedules.bind(this.itineraryStopScheduleController));
        app
            .route("/api/itinerary-stop-schedules/:itineraryId/:stopId")
            .get(this.itineraryStopScheduleController.getItineraryStopScheduleById.bind(this.itineraryStopScheduleController));
    }
}
exports.ItineraryStopScheduleRoutes = ItineraryStopScheduleRoutes;
//# sourceMappingURL=itinerary-stop-schedule.routes.js.map