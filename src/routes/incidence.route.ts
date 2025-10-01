import { Application } from "express";
import { IncidenceController } from "../controller/incidence.Controller";

export class IncidenceRoute {
  public incidenceController: IncidenceController = new IncidenceController();

  public routes(app: Application): void {
    app.route("/api/incidences").get(this.incidenceController.getIncidences);
  }
}
