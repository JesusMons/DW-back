import { Request, Response } from "express";
import { RouteStop, RouteStopI } from "../database/models/routeStop";

export class RouteStopController {
  public async getAllRouteStops(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;
      if (req.query.routeId) {
        const routeId = Number(req.query.routeId);
        if (!Number.isNaN(routeId)) where.routeId = routeId;
      }
      if (req.query.stopId) {
        const stopId = Number(req.query.stopId);
        if (!Number.isNaN(stopId)) where.stopId = stopId;
      }

      const routeStops = await RouteStop.findAll({ where });
      res.status(200).json({ routeStops });
    } catch (error) {
      res.status(500).json({ error: "Error fetching route stops" });
    }
  }

  public async getRouteStopById(req: Request, res: Response) {
    try {
      const routeId = Number(req.params.routeId);
      const stopId = Number(req.params.stopId);

      if (Number.isNaN(routeId) || Number.isNaN(stopId)) {
        return res.status(400).json({ error: "Invalid composite id" });
      }

      const routeStop = await RouteStop.findOne({
        where: { routeId, stopId },
      });

      if (routeStop) {
        res.status(200).json(routeStop);
      } else {
        res.status(404).json({ error: "Route stop not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching route stop" });
    }
  }

  public async createRouteStop(req: Request, res: Response) {
    const { routeId, stopId, position, scheduledTimeHint, status } = req.body;

    try {
      const body: RouteStopI = {
        routeId,
        stopId,
        position,
        scheduledTimeHint,
        status,
      };

      const newRouteStop = await RouteStop.create({ ...body });
      res.status(201).json(newRouteStop);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateRouteStop(req: Request, res: Response) {
    const routeId = Number(req.params.routeId);
    const stopId = Number(req.params.stopId);

    if (Number.isNaN(routeId) || Number.isNaN(stopId)) {
      return res.status(400).json({ error: "Invalid composite id" });
    }

    const { position, scheduledTimeHint, status } = req.body;

    try {
      const routeStopToUpdate = await RouteStop.findOne({
        where: { routeId, stopId },
      });

      if (routeStopToUpdate) {
        await routeStopToUpdate.update({ position, scheduledTimeHint, status });
        res.status(200).json(routeStopToUpdate);
      } else {
        res.status(404).json({ error: "Route stop not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteRouteStop(req: Request, res: Response) {
    try {
      const routeId = Number(req.params.routeId);
      const stopId = Number(req.params.stopId);

      if (Number.isNaN(routeId) || Number.isNaN(stopId)) {
        return res.status(400).json({ error: "Invalid composite id" });
      }

      const routeStopToDelete = await RouteStop.findOne({
        where: { routeId, stopId },
      });

      if (routeStopToDelete) {
        await routeStopToDelete.destroy();
        res.status(200).json({ message: "Route stop deleted successfully" });
      } else {
        res.status(404).json({ error: "Route stop not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting route stop" });
    }
  }

  public async deleteRouteStopAdv(req: Request, res: Response) {
    try {
      const routeId = Number(req.params.routeId);
      const stopId = Number(req.params.stopId);

      if (Number.isNaN(routeId) || Number.isNaN(stopId)) {
        return res.status(400).json({ error: "Invalid composite id" });
      }

      const routeStopToDisable = await RouteStop.findOne({
        where: { routeId, stopId },
      });

      if (routeStopToDisable) {
        await routeStopToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Route stop marked as inactive" });
      } else {
        res.status(404).json({ error: "Route stop not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking route stop as inactive" });
    }
  }
}
