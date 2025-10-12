import { Request, Response } from "express";
import { Role } from "../database/models/auth/Rol";
import { RoleUser, RoleUserI } from "../database/models/auth/RolUser";
import { User } from "../database/models/auth/User";

const roleUserInclude = [
  {
    model: Role,
    attributes: ["id", "name", "status"],
  },
  {
    model: User,
    attributes: ["id", "username", "email", "status"],
  },
];

export class RoleUserController {
  public async getAllRoleUsers(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      if (req.query.roleId) {
        const roleId = Number(req.query.roleId);
        if (!Number.isNaN(roleId)) {
          where.role_id = roleId;
        }
      }

      if (req.query.userId) {
        const userId = Number(req.query.userId);
        if (!Number.isNaN(userId)) {
          where.user_id = userId;
        }
      }

      const roleUsers = await RoleUser.findAll({ where, include: roleUserInclude });
      res.status(200).json({ roleUsers });
    } catch (error) {
      res.status(500).json({ error: "Error fetching role users" });
    }
  }

  public async getRoleUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const roleUser = await RoleUser.findByPk(id, { include: roleUserInclude });

      if (roleUser) {
        res.status(200).json(roleUser);
      } else {
        res.status(404).json({ error: "Role user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching role user" });
    }
  }

  public async createRoleUser(req: Request, res: Response) {
    const { role_id, user_id, status } = req.body;

    try {
      const body: RoleUserI = {
        role_id,
        user_id,
        status,
      };

      const newRoleUser = await RoleUser.create({ ...body });
      const created = await RoleUser.findByPk(newRoleUser.id, { include: roleUserInclude });

      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateRoleUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { role_id, user_id, status } = req.body;

    try {
      const body: RoleUserI = {
        role_id,
        user_id,
        status,
      };

      const roleUserToUpdate = await RoleUser.findByPk(id);

      if (roleUserToUpdate) {
        await roleUserToUpdate.update(body);
        const updated = await RoleUser.findByPk(id, { include: roleUserInclude });
        res.status(200).json(updated);
      } else {
        res.status(404).json({ error: "Role user not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteRoleUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const roleUserToDelete = await RoleUser.findByPk(id);

      if (roleUserToDelete) {
        await roleUserToDelete.destroy();
        res.status(200).json({ message: "Role user deleted successfully" });
      } else {
        res.status(404).json({ error: "Role user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting role user" });
    }
  }

  public async deleteRoleUserAdv(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const roleUserToDisable = await RoleUser.findByPk(id);

      if (roleUserToDisable) {
        await roleUserToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Role user marked as inactive" });
      } else {
        res.status(404).json({ error: "Role user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking role user as inactive" });
    }
  }
}
