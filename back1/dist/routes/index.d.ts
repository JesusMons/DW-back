import { Application } from "express";
import { AssistanceRoutes } from "./assistance.routes";
import { BusRoutes } from "./bus.routes";
import { DriverRoutes } from "./driver.routes";
import { GuardianRoutes } from "./guardian.routes";
import { IncidenceRoutes } from "./incidence.routes";
import { ItineraryRoutes } from "./itinerary.routes";
import { ItineraryStopScheduleRoutes } from "./itinerary-stop-schedule.routes";
import { MaintenanceRoutes } from "./maintenance.routes";
import { RouteRoutes } from "./route.routes";
import { RouteAssignmentRoutes } from "./route-assignment.routes";
import { RouteStopRoutes } from "./route-stop.routes";
import { StopRoutes } from "./stop.routes";
import { StudentRoutes } from "./student.routes";
export declare class Routes {
    readonly assistanceRoutes: AssistanceRoutes;
    readonly busRoutes: BusRoutes;
    readonly driverRoutes: DriverRoutes;
    readonly guardianRoutes: GuardianRoutes;
    readonly incidenceRoutes: IncidenceRoutes;
    readonly itineraryRoutes: ItineraryRoutes;
    readonly itineraryStopScheduleRoutes: ItineraryStopScheduleRoutes;
    readonly maintenanceRoutes: MaintenanceRoutes;
    readonly routeRoutes: RouteRoutes;
    readonly routeAssignmentRoutes: RouteAssignmentRoutes;
    readonly routeStopRoutes: RouteStopRoutes;
    readonly stopRoutes: StopRoutes;
    readonly studentRoutes: StudentRoutes;
    init(app: Application): void;
}
//# sourceMappingURL=index.d.ts.map