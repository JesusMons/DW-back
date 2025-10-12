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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../database/models/auth/User");
const sanitizeUser = (user) => {
    const _a = user.toJSON(), { password } = _a, rest = __rest(_a, ["password"]);
    return rest;
};
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const users = yield User_1.User.findAll({
                    where,
                    attributes: { exclude: ["password"] },
                });
                res.status(200).json({ users });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching users" });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const user = yield User_1.User.findByPk(id, {
                    attributes: { exclude: ["password"] },
                });
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching user" });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, status, avatar } = req.body;
            try {
                const body = {
                    username,
                    email,
                    password,
                    status: status !== null && status !== void 0 ? status : "ACTIVO",
                    avatar,
                };
                const newUser = yield User_1.User.create(Object.assign({}, body));
                const created = yield User_1.User.findByPk(newUser.id, {
                    attributes: { exclude: ["password"] },
                });
                res.status(201).json(created !== null && created !== void 0 ? created : sanitizeUser(newUser));
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ error: "Invalid id" });
            }
            const { username, email, password, status, avatar } = req.body;
            try {
                const body = {
                    username,
                    email,
                    password,
                    status,
                    avatar,
                };
                const userToUpdate = yield User_1.User.findByPk(id);
                if (userToUpdate) {
                    yield userToUpdate.update(body);
                    const updated = yield User_1.User.findByPk(id, {
                        attributes: { exclude: ["password"] },
                    });
                    res.status(200).json(updated !== null && updated !== void 0 ? updated : sanitizeUser(userToUpdate));
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const userToDelete = yield User_1.User.findByPk(id);
                if (userToDelete) {
                    yield userToDelete.destroy();
                    res.status(200).json({ message: "User deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting user" });
            }
        });
    }
    deleteUserAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id)) {
                    return res.status(400).json({ error: "Invalid id" });
                }
                const userToDisable = yield User_1.User.findByPk(id);
                if (userToDisable) {
                    yield userToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "User marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking user as inactive" });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map