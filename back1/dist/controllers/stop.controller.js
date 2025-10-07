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
exports.StopController = void 0;
const stop_1 = require("../database/models/stop");
class StopController {
    getAllStops(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const data = yield stop_1.Stop.findAll({ where });
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching stops" });
            }
        });
    }
    getStopById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const row = yield stop_1.Stop.findByPk(id);
                if (!row)
                    return res.status(404).json({ error: "Stop not found" });
                res.status(200).json(row);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching stop" });
            }
        });
    }
}
exports.StopController = StopController;
//# sourceMappingURL=stop.controller.js.map