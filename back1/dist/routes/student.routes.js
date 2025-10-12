"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const student_controller_1 = require("../controllers/student.controller");
const auth_1 = require("../middleware/auth");
class StudentRoutes {
    constructor() {
        this.studentController = new student_controller_1.StudentController();
    }
    routes(app) {
        app
            .route("/api/students")
            .get(auth_1.authMiddleware, this.studentController.getAllStudents.bind(this.studentController))
            .post(auth_1.authMiddleware, this.studentController.createStudent.bind(this.studentController));
        app
            .route("/api/students/:id")
            .get(auth_1.authMiddleware, this.studentController.getStudentById.bind(this.studentController))
            .put(auth_1.authMiddleware, this.studentController.updateStudent.bind(this.studentController))
            .delete(auth_1.authMiddleware, this.studentController.deleteStudent.bind(this.studentController));
        app
            .route("/api/students/:id/deactivate")
            .patch(auth_1.authMiddleware, this.studentController.deleteStudentAdv.bind(this.studentController));
    }
}
exports.StudentRoutes = StudentRoutes;
//# sourceMappingURL=student.routes.js.map