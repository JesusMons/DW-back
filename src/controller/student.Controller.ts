import { Request, Response } from "express";
import { Student, studentI } from "../models/studentI";

export class StudentController {
  public async getStudents(req: Request, res: Response) {
    try {
      const students: studentI[] = await Student.findAll({
        where: { status: "ACTIVO" },
      });
      res.status(200).json({ students });
    } catch {
      res.status(500).json({ error: "Error fetching Students" });
    }
  }
}
