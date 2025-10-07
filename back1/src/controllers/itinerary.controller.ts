import { Request, Response } from "express";
import { Itinerary } from "../database/models/itinerari";


export class ItineraryController {
public async getAllItineraries(req: Request, res: Response) {
try {
const where: any = {};
if (req.query.status) where.status = req.query.status;
if (req.query.date) where.date = req.query.date; // opcional
const data = await Itinerary.findAll({ where });
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching itineraries" });
}
}


public async getItineraryById(req: Request, res: Response) {
try {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const row = await Itinerary.findByPk(id);
if (!row) return res.status(404).json({ error: "Itinerary not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching itinerary" });
}
}
}