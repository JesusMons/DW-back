import { Request, Response } from "express";
import { Role, RoleI } from "../database/models/auth/Rol";

export class RoleController {
  public async getAllRoles(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const roles = await Role.findAll({ where });
      res.status(200).json({ roles });
    } catch (error) {
      res.status(500).json({ error: "Error fetching roles" });
    }
  }

  public async getRoleById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const role = await Role.findByPk(id);

      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ error: "Role not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching role" });
    }
  }

  public async createRole(req: Request, res: Response) {
    const { name, status } = req.body;

    try {
      const body: RoleI = {
        name,
        status,
      };

      const newRole = await Role.create({ ...body });
      res.status(201).json(newRole);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateRole(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { name, status } = req.body;

    try {
      const body: RoleI = {
        name,
        status,
      };

      const roleToUpdate = await Role.findByPk(id);

      if (roleToUpdate) {
        await roleToUpdate.update(body);
        res.status(200).json(roleToUpdate);
      } else {
        res.status(404).json({ error: "Role not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteRole(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const roleToDelete = await Role.findByPk(id);

      if (roleToDelete) {
        await roleToDelete.destroy();
        res.status(200).json({ message: "Role deleted successfully" });
      } else {
        res.status(404).json({ error: "Role not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting role" });
    }
  }

  public async deleteRoleAdv(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const roleToDisable = await Role.findByPk(id);

      if (roleToDisable) {
        await roleToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Role marked as inactive" });
      } else {
        res.status(404).json({ error: "Role not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking role as inactive" });
    }
  }
}
