import { Application } from "express";
import { ItineraryController } from "../controller/itinerary.Controller";

export class ItineraryRoute {
  public itineraryController: ItineraryController = new ItineraryController();

  public routes(app: Application): void {
    app.route("/api/itineraries").get(this.itineraryController.getItineraries);
  }
}
