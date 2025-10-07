"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryStopSchedule = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const itinerari_1 = require("./itinerari");
const stop_1 = require("./stop");
class ItineraryStopSchedule extends sequelize_1.Model {
}
exports.ItineraryStopSchedule = ItineraryStopSchedule;
ItineraryStopSchedule.init({
    itineraryId: { field: "itinerary_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false, primaryKey: true },
    stopId: { field: "stop_id", type: sequelize_1.DataTypes.BIGINT, allowNull: false, primaryKey: true },
    scheduledTime: { field: "scheduled_time", type: sequelize_1.DataTypes.TIME, allowNull: false },
}, { sequelize: db_1.default, modelName: "ItineraryStopSchedule", tableName: "itinerary_stop_schedule", timestamps: false, underscored: true });
// m:n Itinerary ↔ Stop (definido aquí para evitar ciclos)
itinerari_1.Itinerary.belongsToMany(stop_1.Stop, { through: ItineraryStopSchedule, foreignKey: "itineraryId", otherKey: "stopId", as: "stops" });
stop_1.Stop.belongsToMany(itinerari_1.Itinerary, { through: ItineraryStopSchedule, foreignKey: "stopId", otherKey: "itineraryId", as: "itineraries" });
itinerari_1.Itinerary.hasMany(ItineraryStopSchedule, { foreignKey: "itineraryId", as: "stopSchedule" });
stop_1.Stop.hasMany(ItineraryStopSchedule, { foreignKey: "stopId", as: "itinerarySchedule" });
ItineraryStopSchedule.belongsTo(itinerari_1.Itinerary, { foreignKey: "itineraryId" });
ItineraryStopSchedule.belongsTo(stop_1.Stop, { foreignKey: "stopId" });
//# sourceMappingURL=ItineraryStopSchedule.js.map