import { Application } from "express";
import { GuardianController } from "../controller/guardian.Controller";

export class GuardianRoute {
  public guardianController: GuardianController = new GuardianController();

  public routes(app: Application): void {
    app.route("/api/guardians").get(this.guardianController.getGuardians);
  }
}
