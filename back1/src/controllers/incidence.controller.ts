import { Request, Response } from "express";
import { Incidence } from "../database/models/incidence";

export class IncidenceController {
  public async getAllIncidences(req: Request, res: Response) {
    try {
      const where: any = {};

      if (req.query.status) where.status = req.query.status;
      if (req.query.severity) where.severity = req.query.severity;

      if (req.query.busId) {
        const busId = Number(req.query.busId);
        if (Number.isNaN(busId)) return res.status(400).json({ error: "Invalid busId" });
        where.busId = busId;
      }

      if (req.query.routeId) {
        const routeId = Number(req.query.routeId);
        if (Number.isNaN(routeId)) return res.status(400).json({ error: "Invalid routeId" });
        where.routeId = routeId;
      }

      const data = await Incidence.findAll({ where });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Error fetching incidences" });
    }
  }

  public async getIncidenceById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const row = await Incidence.findByPk(id);
      if (!row) return res.status(404).json({ error: "Incidence not found" });

      res.status(200).json(row);
    } catch (err) {
      res.status(500).json({ error: "Error fetching incidence" });
    }
  }
}
