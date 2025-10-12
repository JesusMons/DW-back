import { Application } from "express";
import { ItineraryStopScheduleController } from "../controllers/ItineraryStopSchedule.Controller";
import { authMiddleware } from "../middleware/auth";

export class ItineraryStopScheduleRoutes {
  private readonly itineraryStopScheduleController =
    new ItineraryStopScheduleController();

  public routes(app: Application): void {
    app
      .route("/api/itinerary-stop-schedules")
      .get(
        authMiddleware,
        this.itineraryStopScheduleController.getAllItineraryStopSchedules.bind(
          this.itineraryStopScheduleController
        )
      )
      .post(
        authMiddleware,
        this.itineraryStopScheduleController.createItineraryStopSchedule.bind(
          this.itineraryStopScheduleController
        )
      );

    app
      .route("/api/itinerary-stop-schedules/:itineraryId/:stopId")
      .get(
        authMiddleware,
        this.itineraryStopScheduleController.getItineraryStopScheduleById.bind(
          this.itineraryStopScheduleController
        )
      )
      .put(
        authMiddleware,
        this.itineraryStopScheduleController.updateItineraryStopSchedule.bind(
          this.itineraryStopScheduleController
        )
      )
      .delete(
        authMiddleware,
        this.itineraryStopScheduleController.deleteItineraryStopSchedule.bind(
          this.itineraryStopScheduleController
        )
      );

    app
      .route("/api/itinerary-stop-schedules/:itineraryId/:stopId/deactivate")
      .patch(
        authMiddleware,
        this.itineraryStopScheduleController.deleteItineraryStopScheduleAdv.bind(
          this.itineraryStopScheduleController
        )
      );
  }
}
