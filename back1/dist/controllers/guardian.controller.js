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
exports.GuardianController = void 0;
const guardian_1 = require("../database/models/guardian");
class GuardianController {
    getAllGuardians(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const guardians = yield guardian_1.Guardian.findAll({ where });
                res.status(200).json({ guardians });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching guardians" });
            }
        });
    }
    getGuardianById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const guardian = yield guardian_1.Guardian.findOne({
                    where: { id: pk },
                });
                if (guardian) {
                    res.status(200).json(guardian);
                }
                else {
                    res.status(404).json({ error: "Guardian not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching guardian" });
            }
        });
    }
    createGuardian(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, document, phone, email, relationship, address, status, } = req.body;
            try {
                const body = {
                    firstName,
                    lastName,
                    document,
                    phone,
                    email,
                    relationship,
                    address,
                    status,
                };
                const newGuardian = yield guardian_1.Guardian.create(Object.assign({}, body));
                res.status(201).json(newGuardian);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateGuardian(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { firstName, lastName, document, phone, email, relationship, address, status, } = req.body;
            try {
                const body = {
                    firstName,
                    lastName,
                    document,
                    phone,
                    email,
                    relationship,
                    address,
                    status,
                };
                const guardianToUpdate = yield guardian_1.Guardian.findOne({
                    where: { id: pk },
                });
                if (guardianToUpdate) {
                    yield guardianToUpdate.update(body);
                    res.status(200).json(guardianToUpdate);
                }
                else {
                    res.status(404).json({ error: "Guardian not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteGuardian(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const guardianToDelete = yield guardian_1.Guardian.findByPk(pk);
                if (guardianToDelete) {
                    yield guardianToDelete.destroy();
                    res.status(200).json({ message: "Guardian deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Guardian not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting guardian" });
            }
        });
    }
    deleteGuardianAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const guardianToDisable = yield guardian_1.Guardian.findOne({
                    where: { id: pk },
                });
                if (guardianToDisable) {
                    yield guardianToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Guardian marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Guardian not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking guardian as inactive" });
            }
        });
    }
}
exports.GuardianController = GuardianController;
//# sourceMappingURL=guardian.controller.js.map