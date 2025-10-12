import { Request, Response } from "express";
import { Itinerary, ItineraryI } from "../database/models/itinerari";

export class ItineraryController {
  public async getAllItineraries(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;
      if (req.query.date) where.date = req.query.date;

      const itineraries = await Itinerary.findAll({ where });
      res.status(200).json({ itineraries });
    } catch (error) {
      res.status(500).json({ error: "Error fetching itineraries" });
    }
  }

  public async getItineraryById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const itinerary = await Itinerary.findOne({
        where: { id: pk },
      });

      if (itinerary) {
        res.status(200).json(itinerary);
      } else {
        res.status(404).json({ error: "Itinerary not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching itinerary" });
    }
  }

  public async createItinerary(req: Request, res: Response) {
    const {
      routeId,
      date,
      departureTime,
      arrivalTime,
      driverId,
      busId,
      status,
      notes,
    } = req.body;

    try {
      const body: ItineraryI = {
        routeId,
        date,
        departureTime,
        arrivalTime,
        driverId,
        busId,
        status,
        notes,
      };

      const newItinerary = await Itinerary.create({ ...body });
      res.status(201).json(newItinerary);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateItinerary(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      routeId,
      date,
      departureTime,
      arrivalTime,
      driverId,
      busId,
      status,
      notes,
    } = req.body;

    try {
      const body: ItineraryI = {
        routeId,
        date,
        departureTime,
        arrivalTime,
        driverId,
        busId,
        status,
        notes,
      };

      const itineraryToUpdate = await Itinerary.findOne({
        where: { id: pk },
      });

      if (itineraryToUpdate) {
        await itineraryToUpdate.update(body);
        res.status(200).json(itineraryToUpdate);
      } else {
        res.status(404).json({ error: "Itinerary not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteItinerary(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const itineraryToDelete = await Itinerary.findByPk(pk);

      if (itineraryToDelete) {
        await itineraryToDelete.destroy();
        res.status(200).json({ message: "Itinerary deleted successfully" });
      } else {
        res.status(404).json({ error: "Itinerary not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting itinerary" });
    }
  }

  public async deleteItineraryAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const itineraryToDisable = await Itinerary.findOne({
        where: { id: pk },
      });

      if (itineraryToDisable) {
        await itineraryToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Itinerary marked as inactive" });
      } else {
        res.status(404).json({ error: "Itinerary not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking itinerary as inactive" });
    }
  }
}
