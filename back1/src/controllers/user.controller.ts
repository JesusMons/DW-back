import { Request, Response } from "express";
import { RefreshToken } from "../database/models/auth/RefreshToken";
import { Role } from "../database/models/auth/Rol";
import { RoleUser } from "../database/models/auth/RolUser";
import { User } from "../database/models/auth/User";

export class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      

      const users = await User.findAll({
        where,
        attributes: { exclude: ["password"] },
        
      });

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      
      });

      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: "Error fetching user" });
    }
  }
}
