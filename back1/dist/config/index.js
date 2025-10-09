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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("../database/db")); // Import the Sequelize instance
const index_1 = require("../routes/index");
// Load environment variables from the .env file
class App {
    constructor(port) {
        this.port = port;
        this.routePrv = new index_1.Routes();
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
        this.dbConnection(); // Call the database connection method
    }
    // Application settings
    settings() {
        this.app.set('port', this.port || process.env.PORT || 4000);
    }
    // Middleware configuration
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json()); // leer json raw
        this.app.use(express_1.default.urlencoded({ extended: false })); //leer json form
    }
    routes() {
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
        this.routePrv.userRoutes.routes(this.app);
        this.routePrv.roleRoutes.routes(this.app);
        this.routePrv.roleUserRoutes.routes(this.app);
        this.routePrv.resourceRoutes.routes(this.app);
        this.routePrv.resourceRoleRoutes.routes(this.app);
        this.routePrv.refreshTokenRoutes.routes(this.app);
    }
    // Method to connect and synchronize the database
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.sync({ force: false }); // Synchronize the database para que no se borren debe estar en false
                console.log("Database connected successfully");
            }
            catch (error) {
                console.error("Unable to connect to the database:", error);
            }
        });
    }
    // Start the server
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('Server on port', this.app.get('port'));
        });
    }
}
exports.App = App;
//# sourceMappingURL=index.js.map