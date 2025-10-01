import { Application } from "express";

import { AssistanceRoute } from "./assistance.route";
import { BusRoute } from "./bus.route";
import { DriverRoute } from "./driver.route";
import { GuardianRoute } from "./guardian.route";
import { IncidenceRoute } from "./incidence.route";
import { ItineraryRoute } from "./itinerary.route";
import { MaintenanceRoute } from "./maintenance.route";
import { RouteAssignmentRoute } from "./routeAssignment.route";
import { RouteRoute } from "./route.route";
import { StopRoute } from "./stop.route";
import { StudentRoute } from "./student.route";

export class Routes {
  public assistanceRoute: AssistanceRoute = new AssistanceRoute();
  public busRoute: BusRoute = new BusRoute();
  public driverRoute: DriverRoute = new DriverRoute();
  public guardianRoute: GuardianRoute = new GuardianRoute();
  public incidenceRoute: IncidenceRoute = new IncidenceRoute();
  public itineraryRoute: ItineraryRoute = new ItineraryRoute();
  public maintenanceRoute: MaintenanceRoute = new MaintenanceRoute();
  public routeAssignmentRoute: RouteAssignmentRoute = new RouteAssignmentRoute();
  public routeRoute: RouteRoute = new RouteRoute();
  public stopRoute: StopRoute = new StopRoute();
  public studentRoute: StudentRoute = new StudentRoute();

  
}
