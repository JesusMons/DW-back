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

export class Routes {
  public readonly assistanceRoutes = new AssistanceRoutes();
  public readonly busRoutes = new BusRoutes();
  public readonly driverRoutes = new DriverRoutes();
  public readonly guardianRoutes = new GuardianRoutes();
  public readonly incidenceRoutes = new IncidenceRoutes();
  public readonly itineraryRoutes = new ItineraryRoutes();
  public readonly itineraryStopScheduleRoutes = new ItineraryStopScheduleRoutes();
  public readonly maintenanceRoutes = new MaintenanceRoutes();
  public readonly routeRoutes = new RouteRoutes();
  public readonly routeAssignmentRoutes = new RouteAssignmentRoutes();
  public readonly routeStopRoutes = new RouteStopRoutes();
  public readonly stopRoutes = new StopRoutes();
  public readonly studentRoutes = new StudentRoutes();

  public init(app: Application): void {
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
