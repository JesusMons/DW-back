import { Request, Response } from "express";
export declare class StopController {
    getAllStops(req: Request, res: Response): Promise<void>;
    getStopById(req: Request, res: Response): Promise<void>;
    createStop(req: Request, res: Response): Promise<void>;
    updateStop(req: Request, res: Response): Promise<void>;
    deleteStop(req: Request, res: Response): Promise<void>;
    deleteStopAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=stop.controller.d.ts.map