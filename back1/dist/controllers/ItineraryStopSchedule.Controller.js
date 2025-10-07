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
exports.ItineraryStopScheduleController = void 0;
const ItineraryStopSchedule_1 = require("../database/models/ItineraryStopSchedule");
class ItineraryStopScheduleController {
    getAllItineraryStopSchedules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield ItineraryStopSchedule_1.ItineraryStopSchedule.findAll();
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching itinerary_stop_schedule" });
            }
        });
    }
    getItineraryStopScheduleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itineraryId = Number(req.params.itineraryId);
                const stopId = Number(req.params.stopId);
                if (Number.isNaN(itineraryId) || Number.isNaN(stopId))
                    return res.status(400).json({ error: "Invalid composite id" });
                const row = yield ItineraryStopSchedule_1.ItineraryStopSchedule.findOne({ where: { itineraryId, stopId } });
                if (!row)
                    return res.status(404).json({ error: "ItineraryStopSchedule not found" });
                res.status(200).json(row);
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching itinerary_stop_schedule" });
            }
        });
    }
}
exports.ItineraryStopScheduleController = ItineraryStopScheduleController;
//# sourceMappingURL=ItineraryStopSchedule.Controller.js.map