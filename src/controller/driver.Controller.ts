import { Request, Response } from "express";
import { Driver, driverI } from "../models/driverI";

export class DriverController {
  public async getDrivers(req: Request, res: Response) {
    try {
      const drivers: driverI[] = await Driver.findAll({
        where: { status: "ACTIVO" },
      });
      res.status(200).json({ drivers });
    } catch {
      res.status(500).json({ error: "Error fetching Drivers" });
    }
  }
}
