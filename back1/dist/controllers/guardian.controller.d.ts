import { Request, Response } from "express";
export declare class GuardianController {
    getAllGuardians(req: Request, res: Response): Promise<void>;
    getGuardianById(req: Request, res: Response): Promise<void>;
    createGuardian(req: Request, res: Response): Promise<void>;
    updateGuardian(req: Request, res: Response): Promise<void>;
    deleteGuardian(req: Request, res: Response): Promise<void>;
    deleteGuardianAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=guardian.controller.d.ts.map