"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoute = void 0;
const student_Controller_1 = require("../controller/student.Controller");
class StudentRoute {
    constructor() {
        this.studentController = new student_Controller_1.StudentController();
    }
    routes(app) {
        app.route("/api/students").get(this.studentController.getStudents);
    }
}
exports.StudentRoute = StudentRoute;
//# sourceMappingURL=student.route.js.map