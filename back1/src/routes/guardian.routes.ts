import { Application } from "express";
import { GuardianController } from "../controllers/guardian.controller";
import { authMiddleware } from "../middleware/auth";

export class GuardianRoutes {
  private readonly guardianController = new GuardianController();

  public routes(app: Application): void {
    app
      .route("/api/guardians")
      .get(authMiddleware, this.guardianController.getAllGuardians.bind(this.guardianController))
      .post(authMiddleware, this.guardianController.createGuardian.bind(this.guardianController));

    app
      .route("/api/guardians/:id")
      .get(authMiddleware, this.guardianController.getGuardianById.bind(this.guardianController))
      .put(authMiddleware, this.guardianController.updateGuardian.bind(this.guardianController))
      .delete(authMiddleware, this.guardianController.deleteGuardian.bind(this.guardianController));

    app
      .route("/api/guardians/:id/deactivate")
      .patch(authMiddleware, this.guardianController.deleteGuardianAdv.bind(this.guardianController));
  }
}
