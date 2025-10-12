import { Application } from "express";
import { IncidenceController } from "../controllers/incidence.controller";
import { authMiddleware } from "../middleware/auth";

export class IncidenceRoutes {
  private readonly incidenceController = new IncidenceController();

  public routes(app: Application): void {
    app
      .route("/api/incidences")
      .get(authMiddleware, this.incidenceController.getAllIncidences.bind(this.incidenceController))
      .post(authMiddleware, this.incidenceController.createIncidence.bind(this.incidenceController));

    app
      .route("/api/incidences/:id")
      .get(authMiddleware, this.incidenceController.getIncidenceById.bind(this.incidenceController))
      .put(authMiddleware, this.incidenceController.updateIncidence.bind(this.incidenceController))
      .delete(authMiddleware, this.incidenceController.deleteIncidence.bind(this.incidenceController));

    app
      .route("/api/incidences/:id/deactivate")
      .patch(authMiddleware, this.incidenceController.deleteIncidenceAdv.bind(this.incidenceController));
  }
}
