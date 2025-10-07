import { Request, Response } from "express";
export declare class GuardianController {
    getAllGuardians(req: Request, res: Response): Promise<void>;
    getGuardianById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=guardian.controller.d.ts.map