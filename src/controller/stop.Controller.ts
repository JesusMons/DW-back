import { Request, Response } from "express";
import { Stop, stopI } from "../models/stopI";

export class StopController {
  public async getStops(req: Request, res: Response) {
    try {
      const stops: stopI[] = await Stop.findAll({
        where: { status: "ACTIVA" },
      });
      res.status(200).json({ stops });
    } catch {
      res.status(500).json({ error: "Error fetching Stops" });
    }
  }
}
