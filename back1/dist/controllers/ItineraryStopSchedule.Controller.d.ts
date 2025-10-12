import { Request, Response } from "express";
export declare class ItineraryStopScheduleController {
    getAllItineraryStopSchedules(req: Request, res: Response): Promise<void>;
    getItineraryStopScheduleById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createItineraryStopSchedule(req: Request, res: Response): Promise<void>;
    updateItineraryStopSchedule(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteItineraryStopSchedule(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteItineraryStopScheduleAdv(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=ItineraryStopSchedule.Controller.d.ts.map