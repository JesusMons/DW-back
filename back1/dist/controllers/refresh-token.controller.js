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
class RefreshTokenController {
    getAllRefreshTokens(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.userId) {
                    const userId = Number(req.query.userId);
                    if (Number.isNaN(userId))
                        return res.status(400).json({ error: "Invalid userId" });
                    where.user_id = userId;
                }
                if (req.query.device_info)
                    where.device_info = req.query.device_info;
                const include = [
                    {
                        model: User_1.User,
                        attributes: ["id", "username", "email", "status"],
                    },
                ];
                const refreshTokens = yield RefreshToken_1.RefreshToken.findAll({ where, include });
                res.status(200).json(refreshTokens);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching refresh tokens" });
            }
        });
    }
    getRefreshTokenById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const include = [
                    {
                        model: User_1.User,
                        attributes: ["id", "username", "email", "status"],
                    },
                ];
                const refreshToken = yield RefreshToken_1.RefreshToken.findByPk(id, { include });
                if (!refreshToken)
                    return res.status(404).json({ error: "Refresh token not found" });
                res.status(200).json(refreshToken);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching refresh token" });
            }
        });
    }
}
exports.RefreshTokenController = RefreshTokenController;
//# sourceMappingURL=refresh-token.controller.js.map