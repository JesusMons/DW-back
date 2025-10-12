import { Application } from "express";
import { StudentController } from "../controllers/student.controller";
import { authMiddleware } from "../middleware/auth";

export class StudentRoutes {
  private readonly studentController = new StudentController();

  public routes(app: Application): void {
    app
      .route("/api/students")
      .get(
        authMiddleware,
        this.studentController.getAllStudents.bind(this.studentController)
      )
      .post(
        authMiddleware,
        this.studentController.createStudent.bind(this.studentController)
      );

    app
      .route("/api/students/:id")
      .get(
        authMiddleware,
        this.studentController.getStudentById.bind(this.studentController)
      )
      .put(
        authMiddleware,
        this.studentController.updateStudent.bind(this.studentController)
      )
      .delete(
        authMiddleware,
        this.studentController.deleteStudent.bind(this.studentController)
      );

    app
      .route("/api/students/:id/deactivate")
      .patch(
        authMiddleware,
        this.studentController.deleteStudentAdv.bind(this.studentController)
      );
  }
}
