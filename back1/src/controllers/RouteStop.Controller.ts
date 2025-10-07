import { Request, Response } from "express";
import { RouteStop } from "../database/models/routeStop";


export class RouteStopController {
public async getAllRouteStops(req: Request, res: Response) {
try {
const data = await RouteStop.findAll();
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching route_stops" });
}
}


public async getRouteStopById(req: Request, res: Response) {
try {
const routeId = Number(req.params.routeId);
const stopId = Number(req.params.stopId);
if (Number.isNaN(routeId) || Number.isNaN(stopId)) return res.status(400).json({ error: "Invalid composite id" });
const row = await RouteStop.findOne({ where: { routeId, stopId } });
if (!row) return res.status(404).json({ error: "RouteStop not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching route_stop" });
}
}
}