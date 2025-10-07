import { Application } from "express";
import { ItineraryStopScheduleController } from "../controllers/ItineraryStopSchedule.Controller";

export class ItineraryStopScheduleRoutes {
  private readonly itineraryStopScheduleController = new ItineraryStopScheduleController();

  public routes(app: Application): void {
    app
      .route("/api/itinerary-stop-schedules")
      .get(this.itineraryStopScheduleController.getAllItineraryStopSchedules.bind(this.itineraryStopScheduleController));

    app
      .route("/api/itinerary-stop-schedules/:itineraryId/:stopId")
      .get(this.itineraryStopScheduleController.getItineraryStopScheduleById.bind(this.itineraryStopScheduleController));
  }
}
