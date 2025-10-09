import { Request, Response } from "express";
export declare class RefreshTokenController {
    getAllRefreshTokens(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getRefreshTokenById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=refresh-token.controller.d.ts.map