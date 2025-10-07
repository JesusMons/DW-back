import { Request, Response } from "express";
export declare class RouteController {
    getAllRoutes(req: Request, res: Response): Promise<void>;
    getRouteById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=route.controller.d.ts.map