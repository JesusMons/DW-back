import { Request, Response } from "express";
import { RouteAssignment, route_assignment } from "../models/route_assignment";

export class RouteAssignmentController {
  public async getAssignments(req: Request, res: Response) {
    try {
      const assignments: route_assignment[] = await RouteAssignment.findAll({
        where: { status: "ACTIVO" },
      });
      res.status(200).json({ assignments });
    } catch {
      res.status(500).json({ error: "Error fetching Route Assignments" });
    }
  }
}
