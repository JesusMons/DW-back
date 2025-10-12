import { Request, Response } from "express";
export declare class DriverController {
    getAllDrivers(req: Request, res: Response): Promise<void>;
    getDriverById(req: Request, res: Response): Promise<void>;
    createDriver(req: Request, res: Response): Promise<void>;
    updateDriver(req: Request, res: Response): Promise<void>;
    deleteDriver(req: Request, res: Response): Promise<void>;
    deleteDriverAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=driver.controller.d.ts.map