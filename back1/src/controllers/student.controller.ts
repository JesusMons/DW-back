import { Request, Response } from "express";
import { Student } from "../database/models/student";


export class StudentController {
public async getAllStudents(req: Request, res: Response) {
try {
const where: any = {};
if (req.query.status) where.status = req.query.status;
const data = await Student.findAll({ where });
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Error fetching students" });
}
}


public async getStudentById(req: Request, res: Response) {
try {
const id = Number(req.params.id);
if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
const row = await Student.findByPk(id);
if (!row) return res.status(404).json({ error: "Student not found" });
res.status(200).json(row);
} catch (err) {
res.status(500).json({ error: "Error fetching student" });
}
}
}