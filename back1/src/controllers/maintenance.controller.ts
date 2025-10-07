import { Request, Response } from "express";
import { Maintenance } from "../database/models/maintenance";

export class MaintenanceController {
  public async getAllMaintenances(req: Request, res: Response) {
    try {
      const where: any = {};

      if (req.query.status) where.status = req.query.status;
      if (req.query.type) where.type = req.query.type;

      if (req.query.busId) {
        const busId = Number(req.query.busId);
        if (Number.isNaN(busId)) return res.status(400).json({ error: "Invalid busId" });
        where.busId = busId;
      }

      if (req.query.performedAt) where.performedAt = req.query.performedAt;

      const data = await Maintenance.findAll({ where });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Error fetching maintenances" });
    }
  }

  public async getMaintenanceById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const row = await Maintenance.findByPk(id);
      if (!row) return res.status(404).json({ error: "Maintenance not found" });

      res.status(200).json(row);
    } catch (err) {
      res.status(500).json({ error: "Error fetching maintenance" });
    }
  }
}
