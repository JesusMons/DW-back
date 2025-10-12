import { Request, Response } from "express";
export declare class MaintenanceController {
    getAllMaintenances(req: Request, res: Response): Promise<void>;
    getMaintenanceById(req: Request, res: Response): Promise<void>;
    createMaintenance(req: Request, res: Response): Promise<void>;
    updateMaintenance(req: Request, res: Response): Promise<void>;
    deleteMaintenance(req: Request, res: Response): Promise<void>;
    deleteMaintenanceAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=maintenance.controller.d.ts.map