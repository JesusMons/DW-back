"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const assistance_routes_1 = require("./assistance.routes");
const bus_routes_1 = require("./bus.routes");
const driver_routes_1 = require("./driver.routes");
const guardian_routes_1 = require("./guardian.routes");
const incidence_routes_1 = require("./incidence.routes");
const itinerary_routes_1 = require("./itinerary.routes");
const itinerary_stop_schedule_routes_1 = require("./itinerary-stop-schedule.routes");
const maintenance_routes_1 = require("./maintenance.routes");
const route_routes_1 = require("./route.routes");
const route_assignment_routes_1 = require("./route-assignment.routes");
const route_stop_routes_1 = require("./route-stop.routes");
const stop_routes_1 = require("./stop.routes");
const student_routes_1 = require("./student.routes");
class Routes {
    constructor() {
        this.assistanceRoutes = new assistance_routes_1.AssistanceRoutes();
        this.busRoutes = new bus_routes_1.BusRoutes();
        this.driverRoutes = new driver_routes_1.DriverRoutes();
        this.guardianRoutes = new guardian_routes_1.GuardianRoutes();
        this.incidenceRoutes = new incidence_routes_1.IncidenceRoutes();
        this.itineraryRoutes = new itinerary_routes_1.ItineraryRoutes();
        this.itineraryStopScheduleRoutes = new itinerary_stop_schedule_routes_1.ItineraryStopScheduleRoutes();
        this.maintenanceRoutes = new maintenance_routes_1.MaintenanceRoutes();
        this.routeRoutes = new route_routes_1.RouteRoutes();
        this.routeAssignmentRoutes = new route_assignment_routes_1.RouteAssignmentRoutes();
        this.routeStopRoutes = new route_stop_routes_1.RouteStopRoutes();
        this.stopRoutes = new stop_routes_1.StopRoutes();
        this.studentRoutes = new student_routes_1.StudentRoutes();
    }
    init(app) {
        this.assistanceRoutes.routes(app);
        this.busRoutes.routes(app);
        this.driverRoutes.routes(app);
        this.guardianRoutes.routes(app);
        this.incidenceRoutes.routes(app);
        this.itineraryRoutes.routes(app);
        this.itineraryStopScheduleRoutes.routes(app);
        this.maintenanceRoutes.routes(app);
        this.routeRoutes.routes(app);
        this.routeAssignmentRoutes.routes(app);
        this.routeStopRoutes.routes(app);
        this.stopRoutes.routes(app);
        this.studentRoutes.routes(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map