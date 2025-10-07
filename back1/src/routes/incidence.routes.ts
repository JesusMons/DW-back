import { Application } from "express";
import { IncidenceController } from "../controllers/incidence.controller";

export class IncidenceRoutes {
  private readonly incidenceController = new IncidenceController();

  public routes(app: Application): void {
    app
      .route("/api/incidences")
      .get(this.incidenceController.getAllIncidences.bind(this.incidenceController));

    app
      .route("/api/incidences/:id")
      .get(this.incidenceController.getIncidenceById.bind(this.incidenceController));
  }
}
