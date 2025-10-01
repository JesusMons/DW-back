import { Request, Response } from "express";
import { Bus, busI } from "../models/busI";

export class BusController {
  public async getBuses(req: Request, res: Response) {
    try {
      const buses: busI[] = await Bus.findAll({
        where: { status: "ACTIVO" },
      });
      res.status(200).json({ buses });
    } catch {
      res.status(500).json({ error: "Error fetching Buses" });
    }
  }
}
