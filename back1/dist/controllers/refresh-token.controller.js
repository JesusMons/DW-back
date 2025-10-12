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
exports.RefreshTokenController = void 0;
const RefreshToken_1 = require("../database/models/auth/RefreshToken");
const User_1 = require("../database/models/auth/User");
const refreshTokenInclude = [
    {
        model: User_1.User,
        attributes: ["id", "username", "email", "status"],
    },
];
class RefreshTokenController {
    getAllRefreshTokens(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.userId) {
                    const userId = Number(req.query.userId);
                    if (!Number.isNaN(userId)) {
                        where.user_id = userId;
                    }
                }
                if (req.query.device_info)
                    where.device_info = req.query.device_info;
                const refreshTokens = yield RefreshToken_1.RefreshToken.findAll({
                    where,
                    include: refreshTokenInclude,
                });
                res.status(200).json({ refreshTokens });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching refresh tokens" });
            }
        });
    }
    getRefreshTokenById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const refreshToken = yield RefreshToken_1.RefreshToken.findByPk(id, {
                    include: refreshTokenInclude,
                });
                if (refreshToken) {
                    res.status(200).json(refreshToken);
                }
                else {
                    res.status(404).json({ error: "Refresh token not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching refresh token" });
            }
        });
    }
    createRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, token, device_info, status, expires_at } = req.body;
            try {
                const body = {
                    user_id,
                    token,
                    device_info,
                    status,
                    expires_at,
                };
                const newRefreshToken = yield RefreshToken_1.RefreshToken.create(Object.assign({}, body));
                const created = yield RefreshToken_1.RefreshToken.findByPk(newRefreshToken.id, {
                    include: refreshTokenInclude,
                });
                res.status(201).json(created);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ error: "Invalid id" });
            }
            const { user_id, token, device_info, status, expires_at } = req.body;
            try {
                const body = {
                    user_id,
                    token,
                    device_info,
                    status,
                    expires_at,
                };
                const refreshTokenToUpdate = yield RefreshToken_1.RefreshToken.findByPk(id);
                if (refreshTokenToUpdate) {
                    yield refreshTokenToUpdate.update(body);
                    const updated = yield RefreshToken_1.RefreshToken.findByPk(id, {
                        include: refreshTokenInclude,
                    });
                    res.status(200).json(updated);
                }
                else {
                    res.status(404).json({ error: "Refresh token not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const refreshTokenToDelete = yield RefreshToken_1.RefreshToken.findByPk(id);
                if (refreshTokenToDelete) {
                    yield refreshTokenToDelete.destroy();
                    res.status(200).json({ message: "Refresh token deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Refresh token not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting refresh token" });
            }
        });
    }
    deleteRefreshTokenAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const refreshTokenToDisable = yield RefreshToken_1.RefreshToken.findByPk(id);
                if (refreshTokenToDisable) {
                    yield refreshTokenToDisable.update({ status: "INACTIVO" });
                    res
                        .status(200)
                        .json({ message: "Refresh token marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Refresh token not found" });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "Error marking refresh token as inactive" });
            }
        });
    }
}
exports.RefreshTokenController = RefreshTokenController;
//# sourceMappingURL=refresh-token.controller.js.map