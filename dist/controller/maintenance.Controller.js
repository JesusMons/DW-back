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
exports.MaintenanceController = void 0;
const maintenanceI_1 = require("../models/maintenanceI");
class MaintenanceController {
    getMaintenances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const maintenances = yield maintenanceI_1.Maintenance.findAll({
                    where: { status: "PENDIENTE" },
                });
                res.status(200).json({ maintenances });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching Maintenances" });
            }
        });
    }
}
exports.MaintenanceController = MaintenanceController;
//# sourceMappingURL=maintenance.Controller.js.map