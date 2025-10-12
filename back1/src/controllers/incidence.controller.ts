import { Request, Response } from "express";
import { Incidence, IncidenceI } from "../database/models/incidence";

export class IncidenceController {
  public async getAllIncidences(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;
      if (req.query.severity) where.severity = req.query.severity;

      if (req.query.busId) {
        const busId = Number(req.query.busId);
        if (!Number.isNaN(busId)) {
          where.busId = busId;
        }
      }

      if (req.query.routeId) {
        const routeId = Number(req.query.routeId);
        if (!Number.isNaN(routeId)) {
          where.routeId = routeId;
        }
      }

      const incidences = await Incidence.findAll({ where });
      res.status(200).json({ incidences });
    } catch (error) {
      res.status(500).json({ error: "Error fetching incidences" });
    }
  }

  public async getIncidenceById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const incidence = await Incidence.findOne({
        where: { id: pk },
      });

      if (incidence) {
        res.status(200).json(incidence);
      } else {
        res.status(404).json({ error: "Incidence not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching incidence" });
    }
  }

  public async createIncidence(req: Request, res: Response) {
    const {
      busId,
      routeId,
      description,
      severity,
      status,
      reportedAt,
      resolvedAt,
      reportedBy,
      actionsTaken,
    } = req.body;

    try {
      const body: IncidenceI = {
        busId,
        routeId,
        description,
        severity,
        status,
        reportedAt,
        resolvedAt,
        reportedBy,
        actionsTaken,
      };

      const newIncidence = await Incidence.create({ ...body });
      res.status(201).json(newIncidence);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateIncidence(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      busId,
      routeId,
      description,
      severity,
      status,
      reportedAt,
      resolvedAt,
      reportedBy,
      actionsTaken,
    } = req.body;

    try {
      const body: IncidenceI = {
        busId,
        routeId,
        description,
        severity,
        status,
        reportedAt,
        resolvedAt,
        reportedBy,
        actionsTaken,
      };

      const incidenceToUpdate = await Incidence.findOne({
        where: { id: pk },
      });

      if (incidenceToUpdate) {
        await incidenceToUpdate.update(body);
        res.status(200).json(incidenceToUpdate);
      } else {
        res.status(404).json({ error: "Incidence not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteIncidence(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const incidenceToDelete = await Incidence.findByPk(pk);

      if (incidenceToDelete) {
        await incidenceToDelete.destroy();
        res.status(200).json({ message: "Incidence deleted successfully" });
      } else {
        res.status(404).json({ error: "Incidence not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting incidence" });
    }
  }

  public async deleteIncidenceAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const incidenceToDisable = await Incidence.findOne({
        where: { id: pk },
      });

      if (incidenceToDisable) {
        await incidenceToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Incidence marked as inactive" });
      } else {
        res.status(404).json({ error: "Incidence not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking incidence as inactive" });
    }
  }
}
