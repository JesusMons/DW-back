import { Request, Response } from "express";
import { Stop } from "../database/models/stop";


export class StopController {
public async getAllStops(req: Request, res: Response) {
try {
const where: any = {};
if (req.query.status) where.status = req.query.status;
const data = await Stop.findAll({ where });
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching stops" });
}
}


public async getStopById(req: Request, res: Response) {
try {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const row = await Stop.findByPk(id);
if (!row) return res.status(404).json({ error: "Stop not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching stop" });
}
}
}