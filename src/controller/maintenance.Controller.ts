import { Request, Response } from "express";
import { Maintenance, maintenanceI } from "../models/maintenanceI";

export class MaintenanceController {
  public async getMaintenances(req: Request, res: Response) {
    try {
      const maintenances: maintenanceI[] = await Maintenance.findAll({
        where: { status: "PENDIENTE" },
      });
      res.status(200).json({ maintenances });
    } catch {
      res.status(500).json({ error: "Error fetching Maintenances" });
    }
  }
}
