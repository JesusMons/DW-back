import { Request, Response } from "express";
export declare class StopController {
    getAllStops(req: Request, res: Response): Promise<void>;
    getStopById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=stop.controller.d.ts.map