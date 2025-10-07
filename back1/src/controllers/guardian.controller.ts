import { Request, Response } from "express";
import { Guardian } from "../database/models/guardian";


export class GuardianController {
public async getAllGuardians(req: Request, res: Response) {
try {
const where: any = {};
if (req.query.status) where.status = req.query.status;
const data = await Guardian.findAll({ where });
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching guardians" });
}
}


public async getGuardianById(req: Request, res: Response) {
try {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const row = await Guardian.findByPk(id);
if (!row) return res.status(404).json({ error: "Guardian not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching guardian" });
}
}
}