"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = require("../database/models/auth/User");
const RefreshToken_1 = require("../database/models/auth/RefreshToken");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, status, avatar } = req.body;
                const user_interface = yield User_1.User.create({
                    username,
                    email,
                    password,
                    status: status !== null && status !== void 0 ? status : "ACTIVO",
                    avatar,
                });
                const token = user_interface.generateToken();
                res.status(201).json({ user_interface, token });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al registrar el usuario' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User_1.User.findOne({
                    where: {
                        email,
                        status: "ACTIVO",
                    },
                });
                if (!user || !(yield user.checkPassword(password))) {
                    res.status(401).json({ error: 'Credenciales inválidas' });
                    return;
                }
                const token = user.generateToken();
                const { token: refreshToken, expiresAt } = user.generateRefreshToken();
                const deviceInfo = req.headers['user-agent'] || 'unknown';
                yield RefreshToken_1.RefreshToken.update({ status: "INACTIVO" }, {
                    where: {
                        user_id: user.id,
                        device_info: deviceInfo,
                        status: "ACTIVO",
                    },
                });
                yield RefreshToken_1.RefreshToken.create({
                    user_id: user.id,
                    token: refreshToken,
                    device_info: deviceInfo,
                    status: "ACTIVO",
                    expires_at: expiresAt,
                });
                res.status(200).json({ user, token, refreshToken });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al iniciar sesión' });
            }
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                if (!refreshToken) {
                    res.status(400).json({ error: 'Se requiere el refresh token.' });
                    return;
                }
                const storedRefreshToken = yield RefreshToken_1.RefreshToken.findOne({
                    where: { token: refreshToken, status: "ACTIVO" },
                });
                if (!storedRefreshToken) {
                    res.status(401).json({ error: 'Refresh token inválido.' });
                    return;
                }
                if (storedRefreshToken.expires_at &&
                    storedRefreshToken.expires_at.getTime() <= Date.now()) {
                    yield storedRefreshToken.update({ status: "INACTIVO" });
                    res.status(401).json({ error: 'Refresh token expirado.' });
                    return;
                }
                const user = yield User_1.User.findOne({
                    where: { id: storedRefreshToken.user_id, status: "ACTIVO" },
                });
                if (!user) {
                    yield storedRefreshToken.update({ status: "INACTIVO" });
                    res.status(401).json({ error: 'Usuario no encontrado o inactivo.' });
                    return;
                }
                const token = user.generateToken();
                const { token: newRefreshToken, expiresAt } = user.generateRefreshToken();
                yield storedRefreshToken.update({ status: "INACTIVO" });
                yield RefreshToken_1.RefreshToken.create({
                    user_id: user.id,
                    token: newRefreshToken,
                    device_info: storedRefreshToken.device_info || req.headers['user-agent'] || 'unknown',
                    status: "ACTIVO",
                    expires_at: expiresAt,
                });
                res.status(200).json({ token, refreshToken: newRefreshToken });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al refrescar el token' });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map