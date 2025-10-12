import { Request, Response } from "express";
import { Maintenance, MaintenanceI } from "../database/models/maintenance";

export class MaintenanceController {
  public async getAllMaintenances(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;
      if (req.query.type) where.type = req.query.type;

      if (req.query.busId) {
        const busId = Number(req.query.busId);
        if (!Number.isNaN(busId)) {
          where.busId = busId;
        }
      }

      if (req.query.performedAt) where.performedAt = req.query.performedAt;

      const maintenances = await Maintenance.findAll({ where });
      res.status(200).json({ maintenances });
    } catch (error) {
      res.status(500).json({ error: "Error fetching maintenances" });
    }
  }

  public async getMaintenanceById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const maintenance = await Maintenance.findOne({
        where: { id: pk },
      });

      if (maintenance) {
        res.status(200).json(maintenance);
      } else {
        res.status(404).json({ error: "Maintenance not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching maintenance" });
    }
  }

  public async createMaintenance(req: Request, res: Response) {
    const {
      busId,
      type,
      description,
      cost,
      performedAt,
      nextDueDate,
      status,
      mechanic,
      odometer,
    } = req.body;

    try {
      const body: MaintenanceI = {
        busId,
        type,
        description,
        cost,
        performedAt,
        nextDueDate,
        status,
        mechanic,
        odometer,
      };

      const newMaintenance = await Maintenance.create({ ...body });
      res.status(201).json(newMaintenance);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateMaintenance(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      busId,
      type,
      description,
      cost,
      performedAt,
      nextDueDate,
      status,
      mechanic,
      odometer,
    } = req.body;

    try {
      const body: MaintenanceI = {
        busId,
        type,
        description,
        cost,
        performedAt,
        nextDueDate,
        status,
        mechanic,
        odometer,
      };

      const maintenanceToUpdate = await Maintenance.findOne({
        where: { id: pk },
      });

      if (maintenanceToUpdate) {
        await maintenanceToUpdate.update(body);
        res.status(200).json(maintenanceToUpdate);
      } else {
        res.status(404).json({ error: "Maintenance not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteMaintenance(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const maintenanceToDelete = await Maintenance.findByPk(pk);

      if (maintenanceToDelete) {
        await maintenanceToDelete.destroy();
        res.status(200).json({ message: "Maintenance deleted successfully" });
      } else {
        res.status(404).json({ error: "Maintenance not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting maintenance" });
    }
  }

  public async deleteMaintenanceAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const maintenanceToDisable = await Maintenance.findOne({
        where: { id: pk },
      });

      if (maintenanceToDisable) {
        await maintenanceToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Maintenance marked as inactive" });
      } else {
        res.status(404).json({ error: "Maintenance not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking maintenance as inactive" });
    }
  }
}
