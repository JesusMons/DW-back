import { Application } from "express";
import { ItineraryController } from "../controllers/itinerary.controller";

export class ItineraryRoutes {
  private readonly itineraryController = new ItineraryController();

  public routes(app: Application): void {
    app
      .route("/api/itineraries")
      .get(this.itineraryController.getAllItineraries.bind(this.itineraryController));

    app
      .route("/api/itineraries/:id")
      .get(this.itineraryController.getItineraryById.bind(this.itineraryController));
  }
}
