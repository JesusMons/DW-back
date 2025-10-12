import { Request, Response } from "express";
import { Route, RouteI } from "../database/models/route";

export class RouteController {
  public async getAllRoutes(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const routes = await Route.findAll({ where });
      res.status(200).json({ routes });
    } catch (error) {
      res.status(500).json({ error: "Error fetching routes" });
    }
  }

  public async getRouteById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const route = await Route.findOne({
        where: { id: pk },
      });

      if (route) {
        res.status(200).json(route);
      } else {
        res.status(404).json({ error: "Route not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching route" });
    }
  }

  public async createRoute(req: Request, res: Response) {
    const {
      name,
      startPoint,
      endPoint,
      currentBusId,
      currentDriverId,
      status,
    } = req.body;

    try {
      const body: RouteI = {
        name,
        startPoint,
        endPoint,
        currentBusId,
        currentDriverId,
        status,
      };

      const newRoute = await Route.create({ ...body });
      res.status(201).json(newRoute);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateRoute(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      name,
      startPoint,
      endPoint,
      currentBusId,
      currentDriverId,
      status,
    } = req.body;

    try {
      const body: RouteI = {
        name,
        startPoint,
        endPoint,
        currentBusId,
        currentDriverId,
        status,
      };

      const routeToUpdate = await Route.findOne({
        where: { id: pk },
      });

      if (routeToUpdate) {
        await routeToUpdate.update(body);
        res.status(200).json(routeToUpdate);
      } else {
        res.status(404).json({ error: "Route not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteRoute(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const routeToDelete = await Route.findByPk(pk);

      if (routeToDelete) {
        await routeToDelete.destroy();
        res.status(200).json({ message: "Route deleted successfully" });
      } else {
        res.status(404).json({ error: "Route not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting route" });
    }
  }

  public async deleteRouteAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const routeToDisable = await Route.findOne({
        where: { id: pk },
      });

      if (routeToDisable) {
        await routeToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Route marked as inactive" });
      } else {
        res.status(404).json({ error: "Route not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking route as inactive" });
    }
  }
}
