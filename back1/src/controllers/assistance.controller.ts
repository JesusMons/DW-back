import { Request, Response } from "express";
import { Assistance } from "../database/models/assistance";

export class AssistanceController {
  public async getAllAssistances(req: Request, res: Response) {
    try {
      const where: any = {};

      if (req.query.status) where.status = req.query.status;

      if (req.query.studentId) {
        const studentId = Number(req.query.studentId);
        if (Number.isNaN(studentId)) return res.status(400).json({ error: "Invalid studentId" });
        where.studentId = studentId;
      }

      if (req.query.routeId) {
        const routeId = Number(req.query.routeId);
        if (Number.isNaN(routeId)) return res.status(400).json({ error: "Invalid routeId" });
        where.routeId = routeId;
      }

      if (req.query.busId) {
        const busId = Number(req.query.busId);
        if (Number.isNaN(busId)) return res.status(400).json({ error: "Invalid busId" });
        where.busId = busId;
      }

      if (req.query.date) where.date = req.query.date;

      const data = await Assistance.findAll({ where });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Error fetching assistances" });
    }
  }

  public async getAssistanceById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const row = await Assistance.findByPk(id);
      if (!row) return res.status(404).json({ error: "Assistance not found" });

      res.status(200).json(row);
    } catch (err) {
      res.status(500).json({ error: "Error fetching assistance" });
    }
  }
}
