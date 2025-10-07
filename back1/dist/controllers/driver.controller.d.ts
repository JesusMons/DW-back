import { Request, Response } from "express";
export declare class DriverController {
    getAllDrivers(req: Request, res: Response): Promise<void>;
    getDriverById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=driver.controller.d.ts.map