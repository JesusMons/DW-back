import { Application } from "express";
import { StudentController } from "../controllers/student.controller";

export class StudentRoutes {
  private readonly studentController = new StudentController();

  public routes(app: Application): void {
    app
      .route("/api/students")
      .get(this.studentController.getAllStudents.bind(this.studentController));

    app
      .route("/api/students/:id")
      .get(this.studentController.getStudentById.bind(this.studentController));
  }
}
