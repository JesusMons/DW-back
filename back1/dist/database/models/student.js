"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Student extends sequelize_1.Model {
}
exports.Student = Student;
Student.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    lastName: { field: "last_name", type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    document: { type: sequelize_1.DataTypes.STRING(32), allowNull: false, unique: true },
    guardianId: { field: "guardian_id", type: sequelize_1.DataTypes.BIGINT, allowNull: true },
    grade: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    birthdate: { type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
    address: { type: sequelize_1.DataTypes.STRING(190), allowNull: true },
    phone: { type: sequelize_1.DataTypes.STRING(30), allowNull: true },
    guardianPhone: { field: "guardian_phone", type: sequelize_1.DataTypes.STRING(30), allowNull: true },
    email: { type: sequelize_1.DataTypes.STRING(190), allowNull: true, validate: { isEmail: true } },
    status: { type: sequelize_1.DataTypes.ENUM("ACTIVO", "INACTIVO", "GRADUADO"), allowNull: false, defaultValue: "ACTIVO" },
    allergies: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    emergencyContact: { field: "emergency_contact", type: sequelize_1.DataTypes.JSON, allowNull: true },
}, { sequelize: db_1.default, modelName: "Student", tableName: "students", timestamps: true, underscored: true });
//# sourceMappingURL=student.js.map