import { Request, Response } from "express";
export declare class ItineraryController {
    getAllItineraries(req: Request, res: Response): Promise<void>;
    getItineraryById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=itinerary.controller.d.ts.map