"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const student_controller_1 = require("../controllers/student.controller");
class StudentRoutes {
    constructor() {
        this.studentController = new student_controller_1.StudentController();
    }
    routes(app) {
        app
            .route("/api/students")
            .get(this.studentController.getAllStudents.bind(this.studentController));
        app
            .route("/api/students/:id")
            .get(this.studentController.getStudentById.bind(this.studentController));
    }
}
exports.StudentRoutes = StudentRoutes;
//# sourceMappingURL=student.routes.js.map