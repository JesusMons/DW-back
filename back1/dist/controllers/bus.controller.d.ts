import { Request, Response } from "express";
export declare class BusController {
    getAllBuses(req: Request, res: Response): Promise<void>;
    getBusById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=bus.controller.d.ts.map