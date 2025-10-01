"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const assistance_route_1 = require("./assistance.route");
const bus_route_1 = require("./bus.route");
const driver_route_1 = require("./driver.route");
const guardian_route_1 = require("./guardian.route");
const incidence_route_1 = require("./incidence.route");
const itinerary_route_1 = require("./itinerary.route");
const maintenance_route_1 = require("./maintenance.route");
const routeAssignment_route_1 = require("./routeAssignment.route");
const route_route_1 = require("./route.route");
const stop_route_1 = require("./stop.route");
const student_route_1 = require("./student.route");
class Routes {
    constructor() {
        this.assistanceRoute = new assistance_route_1.AssistanceRoute();
        this.busRoute = new bus_route_1.BusRoute();
        this.driverRoute = new driver_route_1.DriverRoute();
        this.guardianRoute = new guardian_route_1.GuardianRoute();
        this.incidenceRoute = new incidence_route_1.IncidenceRoute();
        this.itineraryRoute = new itinerary_route_1.ItineraryRoute();
        this.maintenanceRoute = new maintenance_route_1.MaintenanceRoute();
        this.routeAssignmentRoute = new routeAssignment_route_1.RouteAssignmentRoute();
        this.routeRoute = new route_route_1.RouteRoute();
        this.stopRoute = new stop_route_1.StopRoute();
        this.studentRoute = new student_route_1.StudentRoute();
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map