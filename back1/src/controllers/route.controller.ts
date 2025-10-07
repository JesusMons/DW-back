import { Request, Response } from "express";
import { Route } from "../database/models/route";


export class RouteController {
public async getAllRoutes(req: Request, res: Response) {
try {
const where: any = {};
if (req.query.status) where.status = req.query.status;
const data = await Route.findAll({ where });
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching routes" });
}
}


public async getRouteById(req: Request, res: Response) {
try {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const row = await Route.findByPk(id);
if (!row) return res.status(404).json({ error: "Route not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching route" });
}
}
}