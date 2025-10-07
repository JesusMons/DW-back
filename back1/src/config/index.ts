import express, { Application } from "express";
import morgan from "morgan";
import sequelize from "../database/db"; // Import the Sequelize instance
import { Routes } from "../routes/index";

// Load environment variables from the .env file

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();


  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection(); // Call the database connection method
  }

  // Application settings
  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }

   

  // Middleware configuration
  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json()); // leer json raw
    this.app.use(express.urlencoded({ extended: false })); //leer json form
  }

  private routes(): void {
    this.routePrv.assistanceRoutes.routes(this.app);
    this.routePrv.busRoutes.routes(this.app);
    this.routePrv.driverRoutes.routes(this.app);
    this.routePrv.guardianRoutes.routes(this.app);
    this.routePrv.incidenceRoutes.routes(this.app);
    this.routePrv.itineraryRoutes.routes(this.app);
    this.routePrv.itineraryStopScheduleRoutes.routes(this.app);
    this.routePrv.maintenanceRoutes.routes(this.app);
    this.routePrv.routeRoutes.routes(this.app);
    this.routePrv.routeAssignmentRoutes.routes(this.app);
    this.routePrv.routeStopRoutes.routes(this.app);
    this.routePrv.stopRoutes.routes(this.app);
    this.routePrv.studentRoutes.routes(this.app);
  }

  // Method to connect and synchronize the database
  private async dbConnection(): Promise<void> {
    try {
      await sequelize.sync({ force: true }); // Synchronize the database
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  // Start the server
  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
  }
}
