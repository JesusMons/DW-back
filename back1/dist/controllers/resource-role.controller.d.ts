import { Request, Response } from "express";
export declare class ResourceRoleController {
    getAllResourceRoles(req: Request, res: Response): Promise<void>;
    getResourceRoleById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createResourceRole(req: Request, res: Response): Promise<void>;
    updateResourceRole(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteResourceRole(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteResourceRoleAdv(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=resource-role.controller.d.ts.map