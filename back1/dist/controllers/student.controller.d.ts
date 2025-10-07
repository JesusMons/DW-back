import { Request, Response } from "express";
export declare class StudentController {
    getAllStudents(req: Request, res: Response): Promise<void>;
    getStudentById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=student.controller.d.ts.map