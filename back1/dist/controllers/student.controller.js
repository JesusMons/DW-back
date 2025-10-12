"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_1 = require("../database/models/student");
class StudentController {
    getAllStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                if (req.query.status)
                    where.status = req.query.status;
                const students = yield student_1.Student.findAll({ where });
                res.status(200).json({ students });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching students" });
            }
        });
    }
    getStudentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const student = yield student_1.Student.findOne({
                    where: { id: pk },
                });
                if (student) {
                    res.status(200).json(student);
                }
                else {
                    res.status(404).json({ error: "Student not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching student" });
            }
        });
    }
    createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastName, document, guardianId, grade, birthdate, address, phone, guardianPhone, email, status, allergies, emergencyContact, } = req.body;
            try {
                const body = {
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
                const newStudent = yield student_1.Student.create(Object.assign({}, body));
                res.status(201).json(newStudent);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { name, lastName, document, guardianId, grade, birthdate, address, phone, guardianPhone, email, status, allergies, emergencyContact, } = req.body;
            try {
                const body = {
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
                const studentToUpdate = yield student_1.Student.findOne({
                    where: { id: pk },
                });
                if (studentToUpdate) {
                    yield studentToUpdate.update(body);
                    res.status(200).json(studentToUpdate);
                }
                else {
                    res.status(404).json({ error: "Student not found" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const studentToDelete = yield student_1.Student.findByPk(pk);
                if (studentToDelete) {
                    yield studentToDelete.destroy();
                    res.status(200).json({ message: "Student deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Student not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting student" });
            }
        });
    }
    deleteStudentAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const studentToDisable = yield student_1.Student.findOne({
                    where: { id: pk },
                });
                if (studentToDisable) {
                    yield studentToDisable.update({ status: "INACTIVO" });
                    res.status(200).json({ message: "Student marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Student not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking student as inactive" });
            }
        });
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map