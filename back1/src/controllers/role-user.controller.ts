import { Request, Response } from "express";
import { Role } from "../database/models/auth/Rol";
import { RoleUser } from "../database/models/auth/RolUser";
import { User } from "../database/models/auth/User";

export class RoleUserController {
  public async getAllRoleUsers(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      if (req.query.roleId) {
        const roleId = Number(req.query.roleId);
        if (Number.isNaN(roleId)) return res.status(400).json({ error: "Invalid roleId" });
        where.role_id = roleId;
      }

      if (req.query.userId) {
        const userId = Number(req.query.userId);
        if (Number.isNaN(userId)) return res.status(400).json({ error: "Invalid userId" });
        where.user_id = userId;
      }

      const include = [
        {
          model: Role,
          attributes: ["id", "name", "status"],
        },
        {
          model: User,
          attributes: ["id", "username", "email", "status"],
        },
      ];

      const roleUsers = await RoleUser.findAll({ where, include });

      res.status(200).json(roleUsers);
    } catch (err) {
      res.status(500).json({ error: "Error fetching role users" });
    }
  }

  public async getRoleUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const include = [
        {
          model: Role,
          attributes: ["id", "name", "status"],
        },
        {
          model: User,
          attributes: ["id", "username", "email", "status"],
        },
      ];

      const roleUser = await RoleUser.findByPk(id, { include });

      if (!roleUser) return res.status(404).json({ error: "Role user not found" });

      res.status(200).json(roleUser);
    } catch (err) {
      res.status(500).json({ error: "Error fetching role user" });
    }
  }
}
