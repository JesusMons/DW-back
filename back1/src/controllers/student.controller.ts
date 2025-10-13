import { Request, Response } from "express";
import sequelize from "../database/db";
import { Student, StudentI, StudentStatus } from "../database/models/student";
import { createUserForPerson } from "../utils/createUserForPerson";

export class StudentController {
  public async getAllStudents(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const students = await Student.findAll({ where });
      res.status(200).json({ students });
    } catch (error) {
      res.status(500).json({ error: "Error fetching students" });
    }
  }

  public async getStudentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const student = await Student.findOne({
        where: { id: pk },
      });

      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching student" });
    }
  }

  public async createStudent(req: Request, res: Response) {
    const {
      name,
      lastName,
      document,
      guardianId,
      grade,
      birthdate,
      address,
      phone,
      guardianPhone,
      email,
      status,
      allergies,
      emergencyContact,
    } = req.body;

    try {
      const normalizedStatus: StudentStatus =
        status === "INACTIVO" ? "INACTIVO" : "ACTIVO";

      const body: StudentI = {
        name,
        lastName,
        document,
        guardianId,
        grade,
        birthdate,
        address,
        phone,
        guardianPhone,
        email,
        status: normalizedStatus,
        allergies,
        emergencyContact,
      };

      const newStudent = await sequelize.transaction(async (transaction) => {
        const createdStudent = await Student.create({ ...body }, { transaction });

        await createUserForPerson({
          document,
          email,
          status: normalizedStatus,
          transaction,
        });

        return createdStudent;
      });

      res.status(201).json(newStudent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateStudent(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      name,
      lastName,
      document,
      guardianId,
      grade,
      birthdate,
      address,
      phone,
      guardianPhone,
      email,
      status,
      allergies,
      emergencyContact,
    } = req.body;

    try {
      const body: StudentI = {
        name,
        lastName,
        document,
        guardianId,
        grade,
        birthdate,
        address,
        phone,
        guardianPhone,
        email,
        status,
        allergies,
        emergencyContact,
      };

      const studentToUpdate = await Student.findOne({
        where: { id: pk },
      });

      if (studentToUpdate) {
        await studentToUpdate.update(body);
        res.status(200).json(studentToUpdate);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteStudent(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const studentToDelete = await Student.findByPk(pk);

      if (studentToDelete) {
        await studentToDelete.destroy();
        res.status(200).json({ message: "Student deleted successfully" });
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting student" });
    }
  }

  public async deleteStudentAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const studentToDisable = await Student.findOne({
        where: { id: pk },
      });

      if (studentToDisable) {
        await studentToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Student marked as inactive" });
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking student as inactive" });
    }
  }
}
