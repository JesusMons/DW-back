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
exports.UserController = void 0;
const RefreshToken_1 = require("../database/models/auth/RefreshToken");
const Rol_1 = require("../database/models/auth/Rol");
const RolUser_1 = require("../database/models/auth/RolUser");
const User_1 = require("../database/models/auth/User");
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const include = [
                    {
                        model: RolUser_1.RoleUser,
                        attributes: ["id", "role_id", "user_id", "status"],
                        include: [
                            {
                                model: Rol_1.Role,
                                attributes: ["id", "name", "status"],
                            },
                        ],
                    },
                    {
                        model: RefreshToken_1.RefreshToken,
                        attributes: ["id", "device_info", "status", "expires_at", "created_at", "updated_at"],
                    },
                ];
                const users = yield User_1.User.findAll({
                    where,
                    attributes: { exclude: ["password"] },
                    include,
                });
                res.status(200).json(users);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching users" });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const include = [
                    {
                        model: RolUser_1.RoleUser,
                        attributes: ["id", "role_id", "user_id", "status"],
                        include: [
                            {
                                model: Rol_1.Role,
                                attributes: ["id", "name", "status"],
                            },
                        ],
                    },
                    {
                        model: RefreshToken_1.RefreshToken,
                        attributes: ["id", "device_info", "status", "expires_at", "created_at", "updated_at"],
                    },
                ];
                const user = yield User_1.User.findByPk(id, {
                    attributes: { exclude: ["password"] },
                    include,
                });
                if (!user)
                    return res.status(404).json({ error: "User not found" });
                res.status(200).json(user);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching user" });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map