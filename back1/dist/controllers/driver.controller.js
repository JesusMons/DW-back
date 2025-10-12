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
exports.DriverController = void 0;
const driver_1 = require("../database/models/driver");
class DriverController {
    getAllDrivers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const drivers = yield driver_1.Driver.findAll({ where });
                res.status(200).json({ drivers });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching drivers" });
            }
        });
    }
    getDriverById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const driver = yield driver_1.Driver.findOne({
                    where: { id: pk },
                });
                if (driver) {
                    res.status(200).json(driver);
                }
                else {
                    res.status(404).json({ error: "Driver not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching driver" });
            }
        });
    }
    createDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, document, phone, email, address, typeLicence, licenceExpiry, experienceYears, status, assignedBusId, photoUrl, } = req.body;
            try {
                const body = {
                    name,
                    document,
                    phone,
                    email,
                    address,
                    typeLicence,
                    licenceExpiry,
                    experienceYears,
                    status,
                    assignedBusId,
                    photoUrl,
                };
                const newDriver = yield driver_1.Driver.create(Object.assign({}, body));
                res.status(201).json(newDriver);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { name, document, phone, email, address, typeLicence, licenceExpiry, experienceYears, status, assignedBusId, photoUrl, } = req.body;
            try {
                const body = {
                    name,
                    document,
                    phone,
                    email,
                    address,
                    typeLicence,
                    licenceExpiry,
                    experienceYears,
                    status,
                    assignedBusId,
                    photoUrl,
                };
                const driverToUpdate = yield driver_1.Driver.findOne({
                    where: { id: pk },
                });
                if (driverToUpdate) {
                    yield driverToUpdate.update(body);
                    res.status(200).json(driverToUpdate);
                }
                else {
                    res.status(404).json({ error: "Driver not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const driverToDelete = yield driver_1.Driver.findByPk(pk);
                if (driverToDelete) {
                    yield driverToDelete.destroy();
                    res.status(200).json({ message: "Driver deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Driver not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting driver" });
            }
        });
    }
    deleteDriverAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const driverToDisable = yield driver_1.Driver.findOne({
                    where: { id: pk },
                });
                if (driverToDisable) {
                    yield driverToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Driver marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Driver not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking driver as inactive" });
            }
        });
    }
}
exports.DriverController = DriverController;
//# sourceMappingURL=driver.controller.js.map