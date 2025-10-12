import { Request, Response } from "express";
export declare class RoleController {
    getAllRoles(req: Request, res: Response): Promise<void>;
    getRoleById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createRole(req: Request, res: Response): Promise<void>;
    updateRole(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteRole(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteRoleAdv(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=role.controller.d.ts.map