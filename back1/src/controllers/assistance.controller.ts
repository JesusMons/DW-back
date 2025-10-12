import { Request, Response } from "express";
import { Assistance, AssistanceI } from "../database/models/assistance";

export class AssistanceController {
  public async getAllAssistances(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      if (req.query.studentId) {
        const studentId = Number(req.query.studentId);
        if (!Number.isNaN(studentId)) {
          where.studentId = studentId;
        }
      }

      if (req.query.routeId) {
        const routeId = Number(req.query.routeId);
        if (!Number.isNaN(routeId)) {
          where.routeId = routeId;
        }
      }

      if (req.query.busId) {
        const busId = Number(req.query.busId);
        if (!Number.isNaN(busId)) {
          where.busId = busId;
        }
      }

      if (req.query.date) where.date = req.query.date;

      const assistances = await Assistance.findAll({ where });
      res.status(200).json({ assistances });
    } catch (error) {
      res.status(500).json({ error: "Error fetching assistances" });
    }
  }

  public async getAssistanceById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const assistance = await Assistance.findOne({
        where: { id: pk },
      });

      if (assistance) {
        res.status(200).json(assistance);
      } else {
        res.status(404).json({ error: "Assistance not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching assistance" });
    }
  }

  public async createAssistance(req: Request, res: Response) {
    const { studentId, routeId, busId, date, time, status } = req.body;

    try {
      const body: AssistanceI = {
        studentId,
        routeId,
        busId,
        date,
        time,
        status,
      };

      const newAssistance = await Assistance.create({ ...body });
      res.status(201).json(newAssistance);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateAssistance(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { studentId, routeId, busId, date, time, status } = req.body;

    try {
      const body: AssistanceI = {
        studentId,
        routeId,
        busId,
        date,
        time,
        status,
      };

      const assistanceToUpdate = await Assistance.findOne({
        where: { id: pk },
      });

      if (assistanceToUpdate) {
        await assistanceToUpdate.update(body);
        res.status(200).json(assistanceToUpdate);
      } else {
        res.status(404).json({ error: "Assistance not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteAssistance(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const assistanceToDelete = await Assistance.findByPk(pk);

      if (assistanceToDelete) {
        await assistanceToDelete.destroy();
        res.status(200).json({ message: "Assistance deleted successfully" });
      } else {
        res.status(404).json({ error: "Assistance not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting assistance" });
    }
  }

  public async deleteAssistanceAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const assistanceToDisable = await Assistance.findOne({
        where: { id: pk },
      });

      if (assistanceToDisable) {
        await assistanceToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Assistance marked as inactive" });
      } else {
        res.status(404).json({ error: "Assistance not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking assistance as inactive" });
    }
  }
}
