import { Application } from "express";
import { ItineraryController } from "../controllers/itinerary.controller";
import { authMiddleware } from "../middleware/auth";

export class ItineraryRoutes {
  private readonly itineraryController = new ItineraryController();

  public routes(app: Application): void {
    app
      .route("/api/itineraries")
      .get(authMiddleware, this.itineraryController.getAllItineraries.bind(this.itineraryController))
      .post(authMiddleware, this.itineraryController.createItinerary.bind(this.itineraryController));

    app
      .route("/api/itineraries/:id")
      .get(authMiddleware, this.itineraryController.getItineraryById.bind(this.itineraryController))
      .put(authMiddleware, this.itineraryController.updateItinerary.bind(this.itineraryController))
      .delete(authMiddleware, this.itineraryController.deleteItinerary.bind(this.itineraryController));

    app
      .route("/api/itineraries/:id/deactivate")
      .patch(authMiddleware, this.itineraryController.deleteItineraryAdv.bind(this.itineraryController));
  }
}
