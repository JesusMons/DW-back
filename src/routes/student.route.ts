import { Application } from "express";
import { StudentController } from "../controller/student.Controller";

export class StudentRoute {
  public studentController: StudentController = new StudentController();

  public routes(app: Application): void {
    app.route("/api/students").get(this.studentController.getStudents);
  }
}
