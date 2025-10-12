import { Request, Response } from "express";
export declare class RouteStopController {
    getAllRouteStops(req: Request, res: Response): Promise<void>;
    getRouteStopById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createRouteStop(req: Request, res: Response): Promise<void>;
    updateRouteStop(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteRouteStop(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteRouteStopAdv(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=RouteStop.Controller.d.ts.map