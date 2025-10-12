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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const db_1 = __importDefault(require("../database/db"));
const User_1 = require("../database/models/auth/User");
const student_1 = require("../database/models/student");
const DEFAULT_STUDENT_PASSWORD = process.env.DEFAULT_STUDENT_PASSWORD || "Cambiar123!";
const sanitizeUser = (user) => {
    if (!user)
        return null;
    const userJSON = user.toJSON();
    delete userJSON.password;
    return userJSON;
};
const usernameBaseFromStudent = (name, lastName, email, document) => {
    var _a;
    if (email) {
        return (_a = email.split("@")[0]) !== null && _a !== void 0 ? _a : "student";
    }
    if (document)
        return document;
    const base = `${name !== null && name !== void 0 ? name : "student"}${lastName !== null && lastName !== void 0 ? lastName : ""}`.trim();
    return base.length > 0 ? base.replace(/\s+/g, "").toLowerCase() : "student";
};
const ensureUniqueUsername = (base, transaction, ignoreUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedBase = base.trim().replace(/\s+/g, ".").replace(/[^a-zA-Z0-9._-]/g, "").toLowerCase() ||
        "student";
    let candidate = sanitizedBase;
    let suffix = 1;
    while (true) {
        const existing = yield User_1.User.findOne({
            where: { username: candidate },
            transaction,
        });
        if (!existing || (ignoreUserId && existing.id === ignoreUserId)) {
            return candidate;
        }
        candidate = `${sanitizedBase}${suffix++}`;
    }
});
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
            const transaction = yield db_1.default.transaction();
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
                const newStudent = yield student_1.Student.create(Object.assign({}, body), { transaction });
                let createdUser = null;
                if (email) {
                    const usernameBase = usernameBaseFromStudent(name, lastName, email, document);
                    const username = yield ensureUniqueUsername(usernameBase, transaction);
                    createdUser = yield User_1.User.create({
                        username,
                        email,
                        password: DEFAULT_STUDENT_PASSWORD,
                        status: "ACTIVO",
                        mustChangePassword: true,
                    }, { transaction });
                }
                yield transaction.commit();
                res.status(201).json({
                    student: newStudent,
                    user: sanitizeUser(createdUser),
                });
            }
            catch (error) {
                yield transaction.rollback();
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id: pk } = req.params;
            const { name, lastName, document, guardianId, grade, birthdate, address, phone, guardianPhone, email, status, allergies, emergencyContact, } = req.body;
            const transaction = yield db_1.default.transaction();
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
                    transaction,
                });
                if (!studentToUpdate) {
                    yield transaction.rollback();
                    res.status(404).json({ error: "Student not found" });
                    return;
                }
                const previousEmail = (_a = studentToUpdate.email) !== null && _a !== void 0 ? _a : null;
                yield studentToUpdate.update(body, { transaction });
                let userPayload = null;
                if (email) {
                    // Check if a user already exists with previous or current email
                    const userByPreviousEmail = previousEmail
                        ? yield User_1.User.findOne({
                            where: { email: previousEmail },
                            transaction,
                        })
                        : null;
                    const userByCurrentEmail = yield User_1.User.findOne({
                        where: { email },
                        transaction,
                    });
                    if (userByPreviousEmail) {
                        const usernameBase = usernameBaseFromStudent(name, lastName, email, document);
                        const ensuredUsername = yield ensureUniqueUsername(usernameBase, transaction, userByPreviousEmail.id);
                        yield userByPreviousEmail.update({
                            email,
                            username: ensuredUsername,
                        }, { transaction });
                        userPayload = sanitizeUser(userByPreviousEmail);
                    }
                    else if (!userByCurrentEmail) {
                        const usernameBase = usernameBaseFromStudent(name, lastName, email, document);
                        const username = yield ensureUniqueUsername(usernameBase, transaction);
                        const newUser = yield User_1.User.create({
                            username,
                            email,
                            password: DEFAULT_STUDENT_PASSWORD,
                            status: "ACTIVO",
                            mustChangePassword: true,
                        }, { transaction });
                        userPayload = sanitizeUser(newUser);
                    }
                    else {
                        userPayload = sanitizeUser(userByCurrentEmail);
                    }
                }
                else if (!email && previousEmail) {
                    const userByPreviousEmail = yield User_1.User.findOne({
                        where: { email: previousEmail },
                        transaction,
                    });
                    if (userByPreviousEmail) {
                        yield userByPreviousEmail.update({ status: "INACTIVO" }, { transaction });
                        userPayload = sanitizeUser(userByPreviousEmail);
                    }
                }
                yield transaction.commit();
                res.status(200).json({
                    student: studentToUpdate,
                    user: userPayload,
                });
            }
            catch (error) {
                yield transaction.rollback();
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const transaction = yield db_1.default.transaction();
            try {
                const { id: pk } = req.params;
                const studentToDelete = yield student_1.Student.findByPk(pk, { transaction });
                if (!studentToDelete) {
                    yield transaction.rollback();
                    res.status(404).json({ error: "Student not found" });
                    return;
                }
                const studentEmail = (_a = studentToDelete.email) !== null && _a !== void 0 ? _a : null;
                yield studentToDelete.destroy({ transaction });
                if (studentEmail) {
                    const user = yield User_1.User.findOne({
                        where: { email: studentEmail },
                        transaction,
                    });
                    if (user) {
                        yield user.update({ status: "INACTIVO" }, { transaction });
                    }
                }
                yield transaction.commit();
                res.status(200).json({ message: "Student deleted successfully" });
            }
            catch (error) {
                yield transaction.rollback();
                res.status(500).json({ error: "Error deleting student" });
            }
        });
    }
    deleteStudentAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.default.transaction();
            try {
                const { id: pk } = req.params;
                const studentToDisable = yield student_1.Student.findOne({
                    where: { id: pk },
                    transaction,
                });
                if (!studentToDisable) {
                    yield transaction.rollback();
                    res.status(404).json({ error: "Student not found" });
                    return;
                }
                yield studentToDisable.update({ status: "INACTIVO" }, { transaction });
                if (studentToDisable.email) {
                    const user = yield User_1.User.findOne({
                        where: { email: studentToDisable.email },
                        transaction,
                    });
                    if (user) {
                        yield user.update({ status: "INACTIVO" }, { transaction });
                    }
                }
                yield transaction.commit();
                res.status(200).json({ message: "Student marked as inactive" });
            }
            catch (error) {
                yield transaction.rollback();
                res.status(500).json({ error: "Error marking student as inactive" });
            }
        });
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map