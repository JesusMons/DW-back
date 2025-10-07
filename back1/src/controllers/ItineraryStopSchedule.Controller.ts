import { Request, Response } from "express";
import { ItineraryStopSchedule } from "../database/models/ItineraryStopSchedule";


export class ItineraryStopScheduleController {
public async getAllItineraryStopSchedules(req: Request, res: Response) {
try {
const data = await ItineraryStopSchedule.findAll();
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching itinerary_stop_schedule" });
}
}


public async getItineraryStopScheduleById(req: Request, res: Response) {
try {
const itineraryId = Number(req.params.itineraryId);
const stopId = Number(req.params.stopId);
if (Number.isNaN(itineraryId) || Number.isNaN(stopId)) return res.status(400).json({ error: "Invalid composite id" });
const row = await ItineraryStopSchedule.findOne({ where: { itineraryId, stopId } });
if (!row) return res.status(404).json({ error: "ItineraryStopSchedule not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching itinerary_stop_schedule" });
}
}
}