import { Application } from "express";
import { GuardianController } from "../controllers/guardian.controller";

export class GuardianRoutes {
  private readonly guardianController = new GuardianController();

  public routes(app: Application): void {
    app
      .route("/api/guardians")
      .get(this.guardianController.getAllGuardians.bind(this.guardianController));

    app
      .route("/api/guardians/:id")
      .get(this.guardianController.getGuardianById.bind(this.guardianController));
  }
}
