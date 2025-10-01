import { Request, Response } from "express";
import { Incidence, incidenceI } from "../models/incidenceI";

export class IncidenceController {
  public async getIncidences(req: Request, res: Response) {
    try {
      const incidences: incidenceI[] = await Incidence.findAll({
        where: { status: "ABIERTA" },
      });
      res.status(200).json({ incidences });
    } catch {
      res.status(500).json({ error: "Error fetching Incidences" });
    }
  }
}
