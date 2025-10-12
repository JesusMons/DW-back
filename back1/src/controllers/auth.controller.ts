import { Request, Response } from 'express';
import { User } from '../database/models/auth/User';
import { RefreshToken } from '../database/models/auth/RefreshToken';

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, status, avatar } = req.body;
      const user_interface: User = await User.create({
        username,
        email,
        password,
        status: status ?? "ACTIVO",
        avatar,
      });
      const token = user_interface.generateToken();
      res.status(201).json({ user_interface, token });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user: User | null = await User.findOne({
        where: {
          email,
          status: "ACTIVO",
        },
      });
      if (!user || !(await user.checkPassword(password))) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      const token = user.generateToken();
      const { token: refreshToken, expiresAt } = user.generateRefreshToken();
      const deviceInfo = req.headers['user-agent'] || 'unknown';

      await RefreshToken.update(
        { status: "INACTIVO" },
        {
          where: {
            user_id: user.id,
            device_info: deviceInfo,
            status: "ACTIVO",
          },
        }
      );

      await RefreshToken.create({
        user_id: user.id,
        token: refreshToken,
        device_info: deviceInfo,
        status: "ACTIVO",
        expires_at: expiresAt,
      });

      res.status(200).json({ user, token, refreshToken });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }

  public async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({ error: 'Se requiere el refresh token.' });
        return;
      }

      const storedRefreshToken = await RefreshToken.findOne({
        where: { token: refreshToken, status: "ACTIVO" },
      });

      if (!storedRefreshToken) {
        res.status(401).json({ error: 'Refresh token inválido.' });
        return;
      }

      if (
        storedRefreshToken.expires_at &&
        storedRefreshToken.expires_at.getTime() <= Date.now()
      ) {
        await storedRefreshToken.update({ status: "INACTIVO" });
        res.status(401).json({ error: 'Refresh token expirado.' });
        return;
      }

      const user = await User.findOne({
        where: { id: storedRefreshToken.user_id, status: "ACTIVO" },
      });

      if (!user) {
        await storedRefreshToken.update({ status: "INACTIVO" });
        res.status(401).json({ error: 'Usuario no encontrado o inactivo.' });
        return;
      }

      const token = user.generateToken();
      const { token: newRefreshToken, expiresAt } = user.generateRefreshToken();

      await storedRefreshToken.update({ status: "INACTIVO" });

      await RefreshToken.create({
        user_id: user.id,
        token: newRefreshToken,
        device_info: storedRefreshToken.device_info || req.headers['user-agent'] || 'unknown',
        status: "ACTIVO",
        expires_at: expiresAt,
      });

      res.status(200).json({ token, refreshToken: newRefreshToken });
    } catch (error) {
      res.status(500).json({ error: 'Error al refrescar el token' });
    }
  }
}
