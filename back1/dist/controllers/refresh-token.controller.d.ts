import { Request, Response } from "express";
export declare class RefreshTokenController {
    getAllRefreshTokens(req: Request, res: Response): Promise<void>;
    getRefreshTokenById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createRefreshToken(req: Request, res: Response): Promise<void>;
    updateRefreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteRefreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteRefreshTokenAdv(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=refresh-token.controller.d.ts.map