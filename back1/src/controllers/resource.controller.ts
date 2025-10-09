import { Request, Response } from "express";
import { Resource } from "../database/models/auth/Resource";

export class ResourceController {
  public async getAllResources(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;
      if (req.query.method) where.method = req.query.method;

      const resources = await Resource.findAll({ where });

      res.status(200).json(resources);
    } catch (err) {
      res.status(500).json({ error: "Error fetching resources" });
    }
  }

  public async getResourceById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const resource = await Resource.findByPk(id);

      if (!resource) return res.status(404).json({ error: "Resource not found" });

      res.status(200).json(resource);
    } catch (err) {
      res.status(500).json({ error: "Error fetching resource" });
    }
  }
}
