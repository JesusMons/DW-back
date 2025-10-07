import { Request, Response } from "express";
import { Bus } from "../database/models/bus";


export class BusController {
public async getAllBuses(req: Request, res: Response) {
try {
const where: any = {};
if (req.query.status) where.status = req.query.status;
const data = await Bus.findAll({ where });
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching buses" });
}
}


public async getBusById(req: Request, res: Response) {
try {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const row = await Bus.findByPk(id);
if (!row) return res.status(404).json({ error: "Bus not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching bus" });
}
}
}