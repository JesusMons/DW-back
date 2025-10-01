import { Request, Response } from "express";
import { Itinerary, ItineraryI } from "../models/ItineraryI";

export class ItineraryController {
  public async getItineraries(req: Request, res: Response) {
    try {
      const itineraries: ItineraryI[] = await Itinerary.findAll({
        where: { status: "PLANEADO" },
      });
      res.status(200).json({ itineraries });
    } catch {
      res.status(500).json({ error: "Error fetching Itineraries" });
    }
  }
}
