import { Request, Response } from "express";
import { Stop, StopI } from "../database/models/stop";

export class StopController {
  public async getAllStops(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const stops = await Stop.findAll({ where });
      res.status(200).json({ stops });
    } catch (error) {
      res.status(500).json({ error: "Error fetching stops" });
    }
  }

  public async getStopById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const stop = await Stop.findOne({
        where: { id: pk },
      });

      if (stop) {
        res.status(200).json(stop);
      } else {
        res.status(404).json({ error: "Stop not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching stop" });
    }
  }

  public async createStop(req: Request, res: Response) {
    const { name, direction, orderHint, landmark, status } = req.body;

    try {
      const body: StopI = {
        name,
        direction,
        orderHint,
        landmark,
        status,
      };

      const newStop = await Stop.create({ ...body });
      res.status(201).json(newStop);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateStop(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, direction, orderHint, landmark, status } = req.body;

    try {
      const body: StopI = {
        name,
        direction,
        orderHint,
        landmark,
        status,
      };

      const stopToUpdate = await Stop.findOne({
        where: { id: pk },
      });

      if (stopToUpdate) {
        await stopToUpdate.update(body);
        res.status(200).json(stopToUpdate);
      } else {
        res.status(404).json({ error: "Stop not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteStop(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const stopToDelete = await Stop.findByPk(pk);

      if (stopToDelete) {
        await stopToDelete.destroy();
        res.status(200).json({ message: "Stop deleted successfully" });
      } else {
        res.status(404).json({ error: "Stop not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting stop" });
    }
  }

  public async deleteStopAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const stopToDisable = await Stop.findOne({
        where: { id: pk },
      });

      if (stopToDisable) {
        await stopToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Stop marked as inactive" });
      } else {
        res.status(404).json({ error: "Stop not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking stop as inactive" });
    }
  }
}
