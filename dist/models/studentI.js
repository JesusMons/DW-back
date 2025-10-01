"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const assistanceI_1 = require("./assistanceI");
class Student extends sequelize_1.Model {
}
exports.Student = Student;
Student.init({
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    last_name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    document: { type: sequelize_1.DataTypes.BIGINT, allowNull: false, unique: true },
    guardian: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    grade: sequelize_1.DataTypes.INTEGER,
    birthdate: sequelize_1.DataTypes.DATEONLY,
    address: sequelize_1.DataTypes.STRING(200),
    phone: sequelize_1.DataTypes.STRING(30),
    guardianPhone: sequelize_1.DataTypes.STRING(30),
    email: { type: sequelize_1.DataTypes.STRING(120), validate: { isEmail: true } },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO", "GRADUADO"), defaultValue: "ACTIVO" },
    allergies: sequelize_1.DataTypes.JSON,
    emergencyContact: sequelize_1.DataTypes.JSON,
}, { sequelize: db_1.default, modelName: "Student", tableName: "students", timestamps: true });
// Asociaciones
Student.hasMany(assistanceI_1.Assistance, { foreignKey: "student_id", sourceKey: "id", as: "assistances" });
assistanceI_1.Assistance.belongsTo(Student, { foreignKey: "student_id", targetKey: "id", as: "student" });
// Las relaciones directas con Guardian se modelan mediante atributos en Student, sin FK física.
//# sourceMappingURL=studentI.js.map