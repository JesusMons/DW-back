import { Request, Response } from "express";
import { Resource } from "../database/models/auth/Resource";
import { ResourceRole } from "../database/models/auth/ResourceRole";
import { Role } from "../database/models/auth/Rol";

export class ResourceRoleController {
  public async getAllResourceRoles(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      if (req.query.roleId) {
        const roleId = Number(req.query.roleId);
        if (Number.isNaN(roleId)) return res.status(400).json({ error: "Invalid roleId" });
        where.role_id = roleId;
      }

      if (req.query.resourceId) {
        const resourceId = Number(req.query.resourceId);
        if (Number.isNaN(resourceId)) return res.status(400).json({ error: "Invalid resourceId" });
        where.resource_id = resourceId;
      }

      const include = [
        {
          model: Role,
          attributes: ["id", "name", "status"],
        },
        {
          model: Resource,
          attributes: ["id", "path", "method", "status"],
        },
      ];

      const resourceRoles = await ResourceRole.findAll({ where, include });

      res.status(200).json(resourceRoles);
    } catch (err) {
      res.status(500).json({ error: "Error fetching resource roles" });
    }
  }

  public async getResourceRoleById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const include = [
        {
          model: Role,
          attributes: ["id", "name", "status"],
        },
        {
          model: Resource,
          attributes: ["id", "path", "method", "status"],
        },
      ];

      const resourceRole = await ResourceRole.findByPk(id, { include });

      if (!resourceRole) return res.status(404).json({ error: "Resource role not found" });

      res.status(200).json(resourceRole);
    } catch (err) {
      res.status(500).json({ error: "Error fetching resource role" });
    }
  }
}
