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
const bus_1 = require("../database/models/bus");
class BusController {
    getAllBuses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const buses = yield bus_1.Bus.findAll({ where });
                res.status(200).json({ buses });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching buses" });
            }
        });
    }
    getBusById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const bus = yield bus_1.Bus.findOne({
                    where: { id: pk },
                });
                if (bus) {
                    res.status(200).json(bus);
                }
                else {
                    res.status(404).json({ error: "Bus not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching bus" });
            }
        });
    }
    createBus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { plate, capacity, mileage, model, brand, year, color, status, insuranceExpiry, lastMaintenance, nextMaintenance, } = req.body;
            try {
                const body = {
                    plate,
                    capacity,
                    mileage,
                    model,
                    brand,
                    year,
                    color,
                    status,
                    insuranceExpiry,
                    lastMaintenance,
                    nextMaintenance,
                };
                const newBus = yield bus_1.Bus.create(Object.assign({}, body));
                res.status(201).json(newBus);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateBus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { plate, capacity, mileage, model, brand, year, color, status, insuranceExpiry, lastMaintenance, nextMaintenance, } = req.body;
            try {
                const body = {
                    plate,
                    capacity,
                    mileage,
                    model,
                    brand,
                    year,
                    color,
                    status,
                    insuranceExpiry,
                    lastMaintenance,
                    nextMaintenance,
                };
                const busToUpdate = yield bus_1.Bus.findOne({
                    where: { id: pk },
                });
                if (busToUpdate) {
                    yield busToUpdate.update(body);
                    res.status(200).json(busToUpdate);
                }
                else {
                    res.status(404).json({ error: "Bus not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteBus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const busToDelete = yield bus_1.Bus.findByPk(pk);
                if (busToDelete) {
                    yield busToDelete.destroy();
                    res.status(200).json({ message: "Bus deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Bus not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting bus" });
            }
        });
    }
    deleteBusAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const busToDisable = yield bus_1.Bus.findOne({
                    where: { id: pk },
                });
                if (busToDisable) {
                    yield busToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Bus marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Bus not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking bus as inactive" });
            }
        });
    }
}
exports.BusController = BusController;
//# sourceMappingURL=bus.controller.js.map