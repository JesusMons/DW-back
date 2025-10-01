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
const guardianI_1 = require("../models/guardianI");
class GuardianController {
    getGuardians(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const guardians = yield guardianI_1.Guardian.findAll({
                    where: { status: "ACTIVO" },
                });
                res.status(200).json({ guardians });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching Guardians" });
            }
        });
    }
}
exports.GuardianController = GuardianController;
//# sourceMappingURL=guardian.Controller.js.map