import { Request, Response } from "express";
export declare class ResourceController {
    getAllResources(req: Request, res: Response): Promise<void>;
    getResourceById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=resource.controller.d.ts.map