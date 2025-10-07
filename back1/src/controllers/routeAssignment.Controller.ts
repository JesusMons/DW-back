import { Request, Response } from "express";
import { RouteAssignment } from "../database/models/routeAssignment";


export class RouteAssignmentController {
public async getAllRouteAssignments(req: Request, res: Response) {
try {
const where: any = {};
if (req.query.status) where.status = req.query.status;
const data = await RouteAssignment.findAll({ where });
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching route_assignments" });
}
}


public async getRouteAssignmentById(req: Request, res: Response) {
try {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const row = await RouteAssignment.findByPk(id);
if (!row) return res.status(404).json({ error: "RouteAssignment not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching route_assignment" });
}
}
}