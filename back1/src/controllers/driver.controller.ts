import { Request, Response } from "express";
import { Driver } from "../database/models/driver";


export class DriverController {
public async getAllDrivers(req: Request, res: Response) {
try {
const where: any = {};
if (req.query.status) where.status = req.query.status;
const data = await Driver.findAll({ where });
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching drivers" });
}
}


public async getDriverById(req: Request, res: Response) {
try {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const row = await Driver.findByPk(id);
if (!row) return res.status(404).json({ error: "Driver not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching driver" });
}
}
}