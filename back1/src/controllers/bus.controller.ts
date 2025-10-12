import { Request, Response } from "express";
import { Bus, BusI } from "../database/models/bus";

export class BusController {
  public async getAllBuses(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const buses = await Bus.findAll({ where });
      res.status(200).json({ buses });
    } catch (error) {
      res.status(500).json({ error: "Error fetching buses" });
    }
  }

  public async getBusById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const bus = await Bus.findOne({
        where: { id: pk },
      });

      if (bus) {
        res.status(200).json(bus);
      } else {
        res.status(404).json({ error: "Bus not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching bus" });
    }
  }

  public async createBus(req: Request, res: Response) {
    const {
      plate,
      capacity,
      mileage,
      model,
      brand,
      year,
      color,
      status,
      insuranceExpiry,
      lastMaintenance,
      nextMaintenance,
    } = req.body;

    try {
      const body: BusI = {
        plate,
        capacity,
        mileage,
        model,
        brand,
        year,
        color,
        status,
        insuranceExpiry,
        lastMaintenance,
        nextMaintenance,
      };

      const newBus = await Bus.create({ ...body });
      res.status(201).json(newBus);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateBus(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      plate,
      capacity,
      mileage,
      model,
      brand,
      year,
      color,
      status,
      insuranceExpiry,
      lastMaintenance,
      nextMaintenance,
    } = req.body;

    try {
      const body: BusI = {
        plate,
        capacity,
        mileage,
        model,
        brand,
        year,
        color,
        status,
        insuranceExpiry,
        lastMaintenance,
        nextMaintenance,
      };

      const busToUpdate = await Bus.findOne({
        where: { id: pk },
      });

      if (busToUpdate) {
        await busToUpdate.update(body);
        res.status(200).json(busToUpdate);
      } else {
        res.status(404).json({ error: "Bus not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteBus(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const busToDelete = await Bus.findByPk(pk);

      if (busToDelete) {
        await busToDelete.destroy();
        res.status(200).json({ message: "Bus deleted successfully" });
      } else {
        res.status(404).json({ error: "Bus not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting bus" });
    }
  }

  public async deleteBusAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const busToDisable = await Bus.findOne({
        where: { id: pk },
      });

      if (busToDisable) {
        await busToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Bus marked as inactive" });
      } else {
        res.status(404).json({ error: "Bus not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking bus as inactive" });
    }
  }
}
