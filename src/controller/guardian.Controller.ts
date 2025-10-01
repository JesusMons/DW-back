import { Request, Response } from "express";
import { Guardian, guardianI } from "../models/guardianI";

export class GuardianController {
  public async getGuardians(req: Request, res: Response) {
    try {
      const guardians: guardianI[] = await Guardian.findAll({
        where: { status: "ACTIVO" },
      });
      res.status(200).json({ guardians });
    } catch {
      res.status(500).json({ error: "Error fetching Guardians" });
    }
  }
}
