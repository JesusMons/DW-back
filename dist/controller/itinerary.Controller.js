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
const ItineraryI_1 = require("../models/ItineraryI");
class ItineraryController {
    getItineraries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itineraries = yield ItineraryI_1.Itinerary.findAll({
                    where: { status: "PLANEADO" },
                });
                res.status(200).json({ itineraries });
            }
            catch (_a) {
                res.status(500).json({ error: "Error fetching Itineraries" });
            }
        });
    }
}
exports.ItineraryController = ItineraryController;
//# sourceMappingURL=itinerary.Controller.js.map