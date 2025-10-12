import { Request, Response } from "express";
import { Resource } from "../database/models/auth/Resource";
import {
  ResourceRole,
  ResourceRoleI,
} from "../database/models/auth/ResourceRole";
import { Role } from "../database/models/auth/Rol";

const resourceRoleInclude = [
  {
    model: Role,
    attributes: ["id", "name", "status"],
  },
  {
    model: Resource,
    attributes: ["id", "path", "method", "status"],
  },
];

export class ResourceRoleController {
  public async getAllResourceRoles(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      if (req.query.roleId) {
        const roleId = Number(req.query.roleId);
        if (!Number.isNaN(roleId)) {
          where.role_id = roleId;
        }
      }

      if (req.query.resourceId) {
        const resourceId = Number(req.query.resourceId);
        if (!Number.isNaN(resourceId)) {
          where.resource_id = resourceId;
        }
      }

      const resourceRoles = await ResourceRole.findAll({
        where,
        include: resourceRoleInclude,
      });
      res.status(200).json({ resourceRoles });
    } catch (error) {
      res.status(500).json({ error: "Error fetching resource roles" });
    }
  }

  public async getResourceRoleById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const resourceRole = await ResourceRole.findByPk(id, {
        include: resourceRoleInclude,
      });

      if (resourceRole) {
        res.status(200).json(resourceRole);
      } else {
        res.status(404).json({ error: "Resource role not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching resource role" });
    }
  }

  public async createResourceRole(req: Request, res: Response) {
    const { resource_id, role_id, status } = req.body;

    try {
      const body: ResourceRoleI = {
        resource_id,
        role_id,
        status,
      };

      const newResourceRole = await ResourceRole.create({ ...body });
      const created = await ResourceRole.findByPk(newResourceRole.id, {
        include: resourceRoleInclude,
      });

      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateResourceRole(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { resource_id, role_id, status } = req.body;

    try {
      const body: ResourceRoleI = {
        resource_id,
        role_id,
        status,
      };

      const resourceRoleToUpdate = await ResourceRole.findByPk(id);

      if (resourceRoleToUpdate) {
        await resourceRoleToUpdate.update(body);
        const updated = await ResourceRole.findByPk(id, {
          include: resourceRoleInclude,
        });
        res.status(200).json(updated);
      } else {
        res.status(404).json({ error: "Resource role not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteResourceRole(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const resourceRoleToDelete = await ResourceRole.findByPk(id);

      if (resourceRoleToDelete) {
        await resourceRoleToDelete.destroy();
        res
          .status(200)
          .json({ message: "Resource role deleted successfully" });
      } else {
        res.status(404).json({ error: "Resource role not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting resource role" });
    }
  }

  public async deleteResourceRoleAdv(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const resourceRoleToDisable = await ResourceRole.findByPk(id);

      if (resourceRoleToDisable) {
        await resourceRoleToDisable.update({ status: "INACTIVO" });
        res
          .status(200)
          .json({ message: "Resource role marked as inactive" });
      } else {
        res.status(404).json({ error: "Resource role not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error marking resource role as inactive" });
    }
  }
}
