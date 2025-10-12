import { Request, Response } from "express";
import {
  RefreshToken,
  RefreshTokenI,
} from "../database/models/auth/RefreshToken";
import { User } from "../database/models/auth/User";

const refreshTokenInclude = [
  {
    model: User,
    attributes: ["id", "username", "email", "status"],
  },
];

export class RefreshTokenController {
  public async getAllRefreshTokens(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      if (req.query.userId) {
        const userId = Number(req.query.userId);
        if (!Number.isNaN(userId)) {
          where.user_id = userId;
        }
      }

      if (req.query.device_info) where.device_info = req.query.device_info;

      const refreshTokens = await RefreshToken.findAll({
        where,
        include: refreshTokenInclude,
      });

      res.status(200).json({ refreshTokens });
    } catch (error) {
      res.status(500).json({ error: "Error fetching refresh tokens" });
    }
  }

  public async getRefreshTokenById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const refreshToken = await RefreshToken.findByPk(id, {
        include: refreshTokenInclude,
      });

      if (refreshToken) {
        res.status(200).json(refreshToken);
      } else {
        res.status(404).json({ error: "Refresh token not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching refresh token" });
    }
  }

  public async createRefreshToken(req: Request, res: Response) {
    const { user_id, token, device_info, status, expires_at } = req.body;

    try {
      const body: Partial<RefreshTokenI> = {
        user_id,
        token,
        device_info,
        status,
        expires_at,
      };

      const newRefreshToken = await RefreshToken.create({ ...body });
      const created = await RefreshToken.findByPk(newRefreshToken.id, {
        include: refreshTokenInclude,
      });

      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateRefreshToken(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { user_id, token, device_info, status, expires_at } = req.body;

    try {
      const body: Partial<RefreshTokenI> = {
        user_id,
        token,
        device_info,
        status,
        expires_at,
      };

      const refreshTokenToUpdate = await RefreshToken.findByPk(id);

      if (refreshTokenToUpdate) {
        await refreshTokenToUpdate.update(body);
        const updated = await RefreshToken.findByPk(id, {
          include: refreshTokenInclude,
        });
        res.status(200).json(updated);
      } else {
        res.status(404).json({ error: "Refresh token not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteRefreshToken(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const refreshTokenToDelete = await RefreshToken.findByPk(id);

      if (refreshTokenToDelete) {
        await refreshTokenToDelete.destroy();
        res.status(200).json({ message: "Refresh token deleted successfully" });
      } else {
        res.status(404).json({ error: "Refresh token not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting refresh token" });
    }
  }

  public async deleteRefreshTokenAdv(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const refreshTokenToDisable = await RefreshToken.findByPk(id);

      if (refreshTokenToDisable) {
        await refreshTokenToDisable.update({ status: "INACTIVO" });
        res
          .status(200)
          .json({ message: "Refresh token marked as inactive" });
      } else {
        res.status(404).json({ error: "Refresh token not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error marking refresh token as inactive" });
    }
  }
}
