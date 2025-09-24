import { Request, Response } from "express";
import { Assistance, AssistanceI } from "../models/assistanceI";

export class assistenaceController {
    public async getAssistenace(req: Request, res: Response) {

        try {
            const assistance: AssistanceI[] = await Assistance.findAll({
                where: { status: 'ACTIVE' }
            });
            res.status(200).json({ Assistance })
        } catch {
            res.status(500).json({ error:"Error fetching  Asistenecias" })

        }
    }
}