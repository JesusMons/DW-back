import { Request, Response } from "express";
import {
  RouteAssignment,
  RouteAssignmentI,
} from "../database/models/routeAssignment";

export class RouteAssignmentController {
  public async getAllRouteAssignments(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const routeAssignments = await RouteAssignment.findAll({ where });
      res.status(200).json({ routeAssignments });
    } catch (error) {
      res.status(500).json({ error: "Error fetching route assignments" });
    }
  }

  public async getRouteAssignmentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const routeAssignment = await RouteAssignment.findOne({
        where: { id: pk },
      });

      if (routeAssignment) {
        res.status(200).json(routeAssignment);
      } else {
        res.status(404).json({ error: "Route assignment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching route assignment" });
    }
  }

  public async createRouteAssignment(req: Request, res: Response) {
    const {
      routeId,
      busId,
      driverId,
      startDate,
      endDate,
      status,
    } = req.body;

    try {
      const body: RouteAssignmentI = {
        routeId,
        busId,
        driverId,
        startDate,
        endDate,
        status,
      };

      const newRouteAssignment = await RouteAssignment.create({ ...body });
      res.status(201).json(newRouteAssignment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateRouteAssignment(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      routeId,
      busId,
      driverId,
      startDate,
      endDate,
      status,
    } = req.body;

    try {
      const body: RouteAssignmentI = {
        routeId,
        busId,
        driverId,
        startDate,
        endDate,
        status,
      };

      const routeAssignmentToUpdate = await RouteAssignment.findOne({
        where: { id: pk },
      });

      if (routeAssignmentToUpdate) {
        await routeAssignmentToUpdate.update(body);
        res.status(200).json(routeAssignmentToUpdate);
      } else {
        res.status(404).json({ error: "Route assignment not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteRouteAssignment(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const routeAssignmentToDelete = await RouteAssignment.findByPk(pk);

      if (routeAssignmentToDelete) {
        await routeAssignmentToDelete.destroy();
        res
          .status(200)
          .json({ message: "Route assignment deleted successfully" });
      } else {
        res.status(404).json({ error: "Route assignment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting route assignment" });
    }
  }

  public async deleteRouteAssignmentAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const routeAssignmentToDisable = await RouteAssignment.findOne({
        where: { id: pk },
      });

      if (routeAssignmentToDisable) {
        await routeAssignmentToDisable.update({ status: "INACTIVO" });
        res
          .status(200)
          .json({ message: "Route assignment marked as inactive" });
      } else {
        res.status(404).json({ error: "Route assignment not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error marking route assignment as inactive" });
    }
  }
}
