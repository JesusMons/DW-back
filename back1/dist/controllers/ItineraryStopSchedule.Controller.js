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
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.itineraryId) {
                    const itineraryId = Number(req.query.itineraryId);
                    if (!Number.isNaN(itineraryId))
                        where.itineraryId = itineraryId;
                }
                if (req.query.stopId) {
                    const stopId = Number(req.query.stopId);
                    if (!Number.isNaN(stopId))
                        where.stopId = stopId;
                }
                const itineraryStopSchedules = yield ItineraryStopSchedule_1.ItineraryStopSchedule.findAll({
                    where,
                });
                res.status(200).json({ itineraryStopSchedules });
            }
            catch (error) {
                res.status(500).json({
                    error: "Error fetching itinerary stop schedules",
                });
            }
        });
    }
    getItineraryStopScheduleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itineraryId = Number(req.params.itineraryId);
                const stopId = Number(req.params.stopId);
                if (Number.isNaN(itineraryId) || Number.isNaN(stopId)) {
                    return res.status(400).json({ error: "Invalid composite id" });
                }
                const itineraryStopSchedule = yield ItineraryStopSchedule_1.ItineraryStopSchedule.findOne({
                    where: { itineraryId, stopId },
                });
                if (itineraryStopSchedule) {
                    res.status(200).json(itineraryStopSchedule);
                }
                else {
                    res.status(404).json({ error: "Itinerary stop schedule not found" });
                }
            }
            catch (error) {
                res.status(500).json({
                    error: "Error fetching itinerary stop schedule",
                });
            }
        });
    }
    createItineraryStopSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { itineraryId, stopId, scheduledTime, status } = req.body;
            try {
                const body = {
                    itineraryId,
                    stopId,
                    scheduledTime,
                    status,
                };
                const newItineraryStopSchedule = yield ItineraryStopSchedule_1.ItineraryStopSchedule.create(Object.assign({}, body));
                res.status(201).json(newItineraryStopSchedule);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateItineraryStopSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const itineraryId = Number(req.params.itineraryId);
            const stopId = Number(req.params.stopId);
            if (Number.isNaN(itineraryId) || Number.isNaN(stopId)) {
                return res.status(400).json({ error: "Invalid composite id" });
            }
            const { scheduledTime, status } = req.body;
            try {
                const itineraryStopScheduleToUpdate = yield ItineraryStopSchedule_1.ItineraryStopSchedule.findOne({
                    where: { itineraryId, stopId },
                });
                if (itineraryStopScheduleToUpdate) {
                    yield itineraryStopScheduleToUpdate.update({ scheduledTime, status });
                    res.status(200).json(itineraryStopScheduleToUpdate);
                }
                else {
                    res.status(404).json({ error: "Itinerary stop schedule not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteItineraryStopSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itineraryId = Number(req.params.itineraryId);
                const stopId = Number(req.params.stopId);
                if (Number.isNaN(itineraryId) || Number.isNaN(stopId)) {
                    return res.status(400).json({ error: "Invalid composite id" });
                }
                const itineraryStopScheduleToDelete = yield ItineraryStopSchedule_1.ItineraryStopSchedule.findOne({
                    where: { itineraryId, stopId },
                });
                if (itineraryStopScheduleToDelete) {
                    yield itineraryStopScheduleToDelete.destroy();
                    res.status(200).json({
                        message: "Itinerary stop schedule deleted successfully",
                    });
                }
                else {
                    res.status(404).json({ error: "Itinerary stop schedule not found" });
                }
            }
            catch (error) {
                res.status(500).json({
                    error: "Error deleting itinerary stop schedule",
                });
            }
        });
    }
    deleteItineraryStopScheduleAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itineraryId = Number(req.params.itineraryId);
                const stopId = Number(req.params.stopId);
                if (Number.isNaN(itineraryId) || Number.isNaN(stopId)) {
                    return res.status(400).json({ error: "Invalid composite id" });
                }
                const itineraryStopScheduleToDisable = yield ItineraryStopSchedule_1.ItineraryStopSchedule.findOne({
                    where: { itineraryId, stopId },
                });
                if (itineraryStopScheduleToDisable) {
                    yield itineraryStopScheduleToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({
                        message: "Itinerary stop schedule marked as inactive",
                    });
                }
                else {
                    res.status(404).json({ error: "Itinerary stop schedule not found" });
                }
            }
            catch (error) {
                res.status(500).json({
                    error: "Error marking itinerary stop schedule as inactive",
                });
            }
        });
    }
}
exports.ItineraryStopScheduleController = ItineraryStopScheduleController;
//# sourceMappingURL=ItineraryStopSchedule.Controller.js.map