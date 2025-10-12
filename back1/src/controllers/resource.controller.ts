import { Request, Response } from "express";
import { Resource, ResourceI } from "../database/models/auth/Resource";

export class ResourceController {
  public async getAllResources(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;
      if (req.query.method) where.method = req.query.method;

      const resources = await Resource.findAll({ where });
      res.status(200).json({ resources });
    } catch (error) {
      res.status(500).json({ error: "Error fetching resources" });
    }
  }

  public async getResourceById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const resource = await Resource.findByPk(id);

      if (resource) {
        res.status(200).json(resource);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching resource" });
    }
  }

  public async createResource(req: Request, res: Response) {
    const { path, method, status } = req.body;

    try {
      const body: ResourceI = {
        path,
        method,
        status,
      };

      const newResource = await Resource.create({ ...body });
      res.status(201).json(newResource);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateResource(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { path, method, status } = req.body;

    try {
      const body: ResourceI = {
        path,
        method,
        status,
      };

      const resourceToUpdate = await Resource.findByPk(id);

      if (resourceToUpdate) {
        await resourceToUpdate.update(body);
        res.status(200).json(resourceToUpdate);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteResource(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const resourceToDelete = await Resource.findByPk(id);

      if (resourceToDelete) {
        await resourceToDelete.destroy();
        res.status(200).json({ message: "Resource deleted successfully" });
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting resource" });
    }
  }

  public async deleteResourceAdv(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const resourceToDisable = await Resource.findByPk(id);

      if (resourceToDisable) {
        await resourceToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Resource marked as inactive" });
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking resource as inactive" });
    }
  }
}
