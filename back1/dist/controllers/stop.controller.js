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
                const stops = yield stop_1.Stop.findAll({ where });
                res.status(200).json({ stops });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching stops" });
            }
        });
    }
    getStopById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const stop = yield stop_1.Stop.findOne({
                    where: { id: pk },
                });
                if (stop) {
                    res.status(200).json(stop);
                }
                else {
                    res.status(404).json({ error: "Stop not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching stop" });
            }
        });
    }
    createStop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, direction, orderHint, landmark, status } = req.body;
            try {
                const body = {
                    name,
                    direction,
                    orderHint,
                    landmark,
                    status,
                };
                const newStop = yield stop_1.Stop.create(Object.assign({}, body));
                res.status(201).json(newStop);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateStop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { name, direction, orderHint, landmark, status } = req.body;
            try {
                const body = {
                    name,
                    direction,
                    orderHint,
                    landmark,
                    status,
                };
                const stopToUpdate = yield stop_1.Stop.findOne({
                    where: { id: pk },
                });
                if (stopToUpdate) {
                    yield stopToUpdate.update(body);
                    res.status(200).json(stopToUpdate);
                }
                else {
                    res.status(404).json({ error: "Stop not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteStop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const stopToDelete = yield stop_1.Stop.findByPk(pk);
                if (stopToDelete) {
                    yield stopToDelete.destroy();
                    res.status(200).json({ message: "Stop deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Stop not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting stop" });
            }
        });
    }
    deleteStopAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const stopToDisable = yield stop_1.Stop.findOne({
                    where: { id: pk },
                });
                if (stopToDisable) {
                    yield stopToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Stop marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Stop not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking stop as inactive" });
            }
        });
    }
}
exports.StopController = StopController;
//# sourceMappingURL=stop.controller.js.map