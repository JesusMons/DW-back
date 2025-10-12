import { Application } from "express";
import { AssistanceController } from "../controllers/assistance.controller";
import { authMiddleware } from "../middleware/auth";

export class AssistanceRoutes {
  private readonly assistanceController = new AssistanceController();

  public routes(app: Application): void {
    app
      .route("/api/assistances")
      .get(authMiddleware, this.assistanceController.getAllAssistances.bind(this.assistanceController))
      .post(authMiddleware, this.assistanceController.createAssistance.bind(this.assistanceController));

    app
      .route("/api/assistances/:id")
      .get(authMiddleware, this.assistanceController.getAssistanceById.bind(this.assistanceController))
      .put(authMiddleware, this.assistanceController.updateAssistance.bind(this.assistanceController))
      .delete(authMiddleware, this.assistanceController.deleteAssistance.bind(this.assistanceController));

    app
      .route("/api/assistances/:id/deactivate")
      .patch(authMiddleware, this.assistanceController.deleteAssistanceAdv.bind(this.assistanceController));
  }
}

