import { Request, Response } from "express";
import { User, UserI } from "../database/models/auth/User";

const sanitizeUser = (user: User) => {
  const { password, ...rest } = user.toJSON() as Record<string, unknown> & {
    password?: string;
  };
  return rest;
};

export class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const users = await User.findAll({
        where,
        attributes: { exclude: ["password"] },
      });

      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching user" });
    }
  }

  public async createUser(req: Request, res: Response) {
    const { username, email, password, status, avatar } = req.body;

    try {
      const body: UserI = {
        username,
        email,
        password,
        status: status ?? "ACTIVO",
        avatar,
      };

      const newUser = await User.create({ ...body });
      const created = await User.findByPk(newUser.id, {
        attributes: { exclude: ["password"] },
      });

      res.status(201).json(created ?? sanitizeUser(newUser));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { username, email, password, status, avatar } = req.body;

    try {
      const body: Partial<UserI> = {
        username,
        email,
        password,
        status,
        avatar,
      };

      const userToUpdate = await User.findByPk(id);

      if (userToUpdate) {
        await userToUpdate.update(body);
        const updated = await User.findByPk(id, {
          attributes: { exclude: ["password"] },
        });
        res.status(200).json(updated ?? sanitizeUser(userToUpdate));
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const userToDelete = await User.findByPk(id);

      if (userToDelete) {
        await userToDelete.destroy();
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  }

  public async deleteUserAdv(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const userToDisable = await User.findByPk(id);

      if (userToDisable) {
        await userToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "User marked as inactive" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking user as inactive" });
    }
  }

  public async resetPassword(req: Request, res: Response) {
    const authUser = req.currentUser;
    if (!authUser) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { currentPassword, newPassword } = req.body ?? {};

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      currentPassword.trim() === "" ||
      newPassword.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Debe proporcionar la contraseña actual y la nueva." });
    }

    try {
      const user = await User.findByPk(authUser.id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const isPasswordValid = await user.checkPassword(currentPassword);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ error: "La contraseña actual no es correcta." });
      }

      await user.update({ password: newPassword });

      res.status(200).json({ message: "Contraseña actualizada correctamente." });
    } catch (error: any) {
      res.status(500).json({ error: "Error al actualizar la contraseña." });
    }
  }
}
