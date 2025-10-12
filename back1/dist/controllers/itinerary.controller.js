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
exports.ItineraryController = void 0;
const itinerari_1 = require("../database/models/itinerari");
class ItineraryController {
    getAllItineraries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                if (req.query.date)
                    where.date = req.query.date;
                const itineraries = yield itinerari_1.Itinerary.findAll({ where });
                res.status(200).json({ itineraries });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching itineraries" });
            }
        });
    }
    getItineraryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const itinerary = yield itinerari_1.Itinerary.findOne({
                    where: { id: pk },
                });
                if (itinerary) {
                    res.status(200).json(itinerary);
                }
                else {
                    res.status(404).json({ error: "Itinerary not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching itinerary" });
            }
        });
    }
    createItinerary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { routeId, date, departureTime, arrivalTime, driverId, busId, status, notes, } = req.body;
            try {
                const body = {
                    routeId,
                    date,
                    departureTime,
                    arrivalTime,
                    driverId,
                    busId,
                    status,
                    notes,
                };
                const newItinerary = yield itinerari_1.Itinerary.create(Object.assign({}, body));
                res.status(201).json(newItinerary);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateItinerary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { routeId, date, departureTime, arrivalTime, driverId, busId, status, notes, } = req.body;
            try {
                const body = {
                    routeId,
                    date,
                    departureTime,
                    arrivalTime,
                    driverId,
                    busId,
                    status,
                    notes,
                };
                const itineraryToUpdate = yield itinerari_1.Itinerary.findOne({
                    where: { id: pk },
                });
                if (itineraryToUpdate) {
                    yield itineraryToUpdate.update(body);
                    res.status(200).json(itineraryToUpdate);
                }
                else {
                    res.status(404).json({ error: "Itinerary not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteItinerary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const itineraryToDelete = yield itinerari_1.Itinerary.findByPk(pk);
                if (itineraryToDelete) {
                    yield itineraryToDelete.destroy();
                    res.status(200).json({ message: "Itinerary deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Itinerary not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting itinerary" });
            }
        });
    }
    deleteItineraryAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const itineraryToDisable = yield itinerari_1.Itinerary.findOne({
                    where: { id: pk },
                });
                if (itineraryToDisable) {
                    yield itineraryToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Itinerary marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Itinerary not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking itinerary as inactive" });
            }
        });
    }
}
exports.ItineraryController = ItineraryController;
//# sourceMappingURL=itinerary.controller.js.map