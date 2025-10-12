import { Request, Response } from "express";
export declare class RouteController {
    getAllRoutes(req: Request, res: Response): Promise<void>;
    getRouteById(req: Request, res: Response): Promise<void>;
    createRoute(req: Request, res: Response): Promise<void>;
    updateRoute(req: Request, res: Response): Promise<void>;
    deleteRoute(req: Request, res: Response): Promise<void>;
    deleteRouteAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=route.controller.d.ts.map