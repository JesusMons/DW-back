import { Application } from "express";
import { AssistanceRoutes } from "./assistance.routes";
import { BusRoutes } from "./bus.routes";
import { DriverRoutes } from "./driver.routes";
import { GuardianRoutes } from "./guardian.routes";
import { IncidenceRoutes } from "./incidence.routes";
import { ItineraryRoutes } from "./itinerary.routes";
import { ItineraryStopScheduleRoutes } from "./itinerary-stop-schedule.routes";
import { MaintenanceRoutes } from "./maintenance.routes";
import { RefreshTokenRoutes } from "./refresh-token.routes";
import { ResourceRoleRoutes } from "./resource-role.routes";
import { ResourceRoutes } from "./resource.routes";
import { RouteRoutes } from "./route.routes";
import { RouteAssignmentRoutes } from "./route-assignment.routes";
import { RouteStopRoutes } from "./route-stop.routes";
import { RoleRoutes } from "./role.routes";
import { RoleUserRoutes } from "./role-user.routes";
import { StopRoutes } from "./stop.routes";
import { StudentRoutes } from "./student.routes";
import { UserRoutes } from "./user.routes";
import { AuthRoutes } from "./auth";

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
  public readonly userRoutes = new UserRoutes();
  public readonly roleRoutes = new RoleRoutes();
  public readonly roleUserRoutes = new RoleUserRoutes();
  public readonly resourceRoutes = new ResourceRoutes();
  public readonly resourceRoleRoutes = new ResourceRoleRoutes();
  public readonly refreshTokenRoutes = new RefreshTokenRoutes();
  public readonly authRoutes = new AuthRoutes();

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
    this.userRoutes.routes(app);
    this.roleRoutes.routes(app);
    this.roleUserRoutes.routes(app);
    this.resourceRoutes.routes(app);
    this.resourceRoleRoutes.routes(app);
    this.refreshTokenRoutes.routes(app);
    this.authRoutes.routes(app);
  }
}
