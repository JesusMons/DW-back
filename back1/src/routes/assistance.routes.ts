import { Application } from "express";
import { AssistanceController } from "../controllers/assistance.controller";

export class AssistanceRoutes {
  private readonly assistanceController = new AssistanceController();

  public routes(app: Application): void {
    app
      .route("/api/assistances")
      .get(this.assistanceController.getAllAssistances.bind(this.assistanceController));

    app
      .route("/api/assistances/:id")
      .get(this.assistanceController.getAssistanceById.bind(this.assistanceController));

    app
      .route("/api/assistances/create")
      .post(this.assistanceController.createAssistance.bind(this.assistanceController)); // nueva línea
  }
}


