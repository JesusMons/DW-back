import { Request, Response } from "express";
import {
  ItineraryStopSchedule,
  ItineraryStopScheduleI,
} from "../database/models/ItineraryStopSchedule";

export class ItineraryStopScheduleController {
  public async getAllItineraryStopSchedules(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;
      if (req.query.itineraryId) {
        const itineraryId = Number(req.query.itineraryId);
        if (!Number.isNaN(itineraryId)) where.itineraryId = itineraryId;
      }
      if (req.query.stopId) {
        const stopId = Number(req.query.stopId);
        if (!Number.isNaN(stopId)) where.stopId = stopId;
      }

      const itineraryStopSchedules = await ItineraryStopSchedule.findAll({
        where,
      });
      res.status(200).json({ itineraryStopSchedules });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching itinerary stop schedules",
      });
    }
  }

  public async getItineraryStopScheduleById(req: Request, res: Response) {
    try {
      const itineraryId = Number(req.params.itineraryId);
      const stopId = Number(req.params.stopId);

      if (Number.isNaN(itineraryId) || Number.isNaN(stopId)) {
        return res.status(400).json({ error: "Invalid composite id" });
      }

      const itineraryStopSchedule = await ItineraryStopSchedule.findOne({
        where: { itineraryId, stopId },
      });

      if (itineraryStopSchedule) {
        res.status(200).json(itineraryStopSchedule);
      } else {
        res.status(404).json({ error: "Itinerary stop schedule not found" });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error fetching itinerary stop schedule",
      });
    }
  }

  public async createItineraryStopSchedule(req: Request, res: Response) {
    const { itineraryId, stopId, scheduledTime, status } = req.body;

    try {
      const body: ItineraryStopScheduleI = {
        itineraryId,
        stopId,
        scheduledTime,
        status,
      };

      const newItineraryStopSchedule = await ItineraryStopSchedule.create({
        ...body,
      });
      res.status(201).json(newItineraryStopSchedule);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateItineraryStopSchedule(req: Request, res: Response) {
    const itineraryId = Number(req.params.itineraryId);
    const stopId = Number(req.params.stopId);

    if (Number.isNaN(itineraryId) || Number.isNaN(stopId)) {
      return res.status(400).json({ error: "Invalid composite id" });
    }

    const { scheduledTime, status } = req.body;

    try {
      const itineraryStopScheduleToUpdate = await ItineraryStopSchedule.findOne(
        {
          where: { itineraryId, stopId },
        }
      );

      if (itineraryStopScheduleToUpdate) {
        await itineraryStopScheduleToUpdate.update({ scheduledTime, status });
        res.status(200).json(itineraryStopScheduleToUpdate);
      } else {
        res.status(404).json({ error: "Itinerary stop schedule not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteItineraryStopSchedule(req: Request, res: Response) {
    try {
      const itineraryId = Number(req.params.itineraryId);
      const stopId = Number(req.params.stopId);

      if (Number.isNaN(itineraryId) || Number.isNaN(stopId)) {
        return res.status(400).json({ error: "Invalid composite id" });
      }

      const itineraryStopScheduleToDelete = await ItineraryStopSchedule.findOne(
        {
          where: { itineraryId, stopId },
        }
      );

      if (itineraryStopScheduleToDelete) {
        await itineraryStopScheduleToDelete.destroy();
        res.status(200).json({
          message: "Itinerary stop schedule deleted successfully",
        });
      } else {
        res.status(404).json({ error: "Itinerary stop schedule not found" });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error deleting itinerary stop schedule",
      });
    }
  }

  public async deleteItineraryStopScheduleAdv(req: Request, res: Response) {
    try {
      const itineraryId = Number(req.params.itineraryId);
      const stopId = Number(req.params.stopId);

      if (Number.isNaN(itineraryId) || Number.isNaN(stopId)) {
        return res.status(400).json({ error: "Invalid composite id" });
      }

      const itineraryStopScheduleToDisable =
        await ItineraryStopSchedule.findOne({
          where: { itineraryId, stopId },
        });

      if (itineraryStopScheduleToDisable) {
        await itineraryStopScheduleToDisable.update({ status: "INACTIVO" });
        res.status(200).json({
          message: "Itinerary stop schedule marked as inactive",
        });
      } else {
        res.status(404).json({ error: "Itinerary stop schedule not found" });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error marking itinerary stop schedule as inactive",
      });
    }
  }
}
