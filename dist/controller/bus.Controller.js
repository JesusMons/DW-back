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
exports.BusController = void 0;
const busI_1 = require("../models/busI");
class BusController {
    getBuses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buses = yield busI_1.Bus.findAll({
                    where: { status: "ACTIVO" },
                });
                res.status(200).json({ buses });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching Buses" });
            }
        });
    }
}
exports.BusController = BusController;
//# sourceMappingURL=bus.Controller.js.map