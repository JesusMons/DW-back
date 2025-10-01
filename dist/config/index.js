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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("../database/db"));
const index_1 = require("../routes/index");
var cors = require("cors"); // install en node y types
// Load environment variables from the .env file
dotenv_1.default.config();
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
        this.app.use(cors());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    // Route configuration
    routes() {
        this.routePrv.assistanceRoute.routes(this.app);
        this.routePrv.busRoute.routes(this.app);
        this.routePrv.driverRoute.routes(this.app);
        this.routePrv.guardianRoute.routes(this.app);
        this.routePrv.incidenceRoute.routes(this.app);
        this.routePrv.itineraryRoute.routes(this.app);
        this.routePrv.maintenanceRoute.routes(this.app);
        this.routePrv.routeAssignmentRoute.routes(this.app);
        this.routePrv.routeRoute.routes(this.app);
        this.routePrv.stopRoute.routes(this.app);
        this.routePrv.studentRoute.routes(this.app);
    }
    // Method to connect and synchronize the database
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.sync({ force: false }); // se borra la base de datos cada vez que ejecute, cambiuar a true 
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