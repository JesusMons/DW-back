import { Request, Response } from "express";
export declare class RoleUserController {
    getAllRoleUsers(req: Request, res: Response): Promise<void>;
    getRoleUserById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createRoleUser(req: Request, res: Response): Promise<void>;
    updateRoleUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteRoleUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteRoleUserAdv(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=role-user.controller.d.ts.map