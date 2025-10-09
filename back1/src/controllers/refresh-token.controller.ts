import { Request, Response } from "express";
import { RefreshToken } from "../database/models/auth/RefreshToken";
import { User } from "../database/models/auth/User";

export class RefreshTokenController {
  public async getAllRefreshTokens(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      if (req.query.userId) {
        const userId = Number(req.query.userId);
        if (Number.isNaN(userId)) return res.status(400).json({ error: "Invalid userId" });
        where.user_id = userId;
      }

      if (req.query.device_info) where.device_info = req.query.device_info;

      

      const refreshTokens = await RefreshToken.findAll({ where });

      res.status(200).json(refreshTokens);
    } catch (err) {
      res.status(500).json({ error: "Error fetching refresh tokens" });
    }
  }

  public async getRefreshTokenById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    

      const refreshToken = await RefreshToken.findByPk(id, {  });

      if (!refreshToken) return res.status(404).json({ error: "Refresh token not found" });

      res.status(200).json(refreshToken);
    } catch (err) {
      res.status(500).json({ error: "Error fetching refresh token" });
    }
  }
}
