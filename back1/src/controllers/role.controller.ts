import { Request, Response } from "express";
import { Resource } from "../database/models/auth/Resource";
import { ResourceRole } from "../database/models/auth/ResourceRole";
import { Role } from "../database/models/auth/Rol";
import { RoleUser } from "../database/models/auth/RolUser";
import { User } from "../database/models/auth/User";

export class RoleController {
  public async getAllRoles(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const roles = await Role.findAll({ where });

      res.status(200).json(roles);
    } catch (err) {
      res.status(500).json({ error: "Error fetching roles" });
    }
  }

  public async getRoleById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const role = await Role.findByPk(id, {  });

      if (!role) return res.status(404).json({ error: "Role not found" });

      res.status(200).json(role);
    } catch (err) {
      res.status(500).json({ error: "Error fetching role" });
    }
  }
}
