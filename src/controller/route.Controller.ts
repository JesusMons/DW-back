import { Request, Response } from "express";
import { Route, RouteI } from "../models/RouteI";

export class RouteController {
  public async getRoutes(req: Request, res: Response) {
    try {
      const routes: RouteI[] = await Route.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json({ routes });
    } catch {
      res.status(500).json({ error: "Error fetching Routes" });
    }
  }
}
