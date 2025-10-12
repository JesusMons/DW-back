import { Request, Response } from "express";
export declare class BusController {
    getAllBuses(req: Request, res: Response): Promise<void>;
    getBusById(req: Request, res: Response): Promise<void>;
    createBus(req: Request, res: Response): Promise<void>;
    updateBus(req: Request, res: Response): Promise<void>;
    deleteBus(req: Request, res: Response): Promise<void>;
    deleteBusAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=bus.controller.d.ts.map