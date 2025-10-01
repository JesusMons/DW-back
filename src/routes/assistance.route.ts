import { Router, Application } from "express";
import { assistenaceController } from "../controller/assistance.controller";

export class AssistanceRoute {
    public assistenaceController: assistenaceController = new assistenaceController();

    public routes(app: Application): void{
        app.route("/api/assistances").get(this.assistenaceController.getAssistenace)
    }
}