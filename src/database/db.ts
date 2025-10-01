// src/database/db.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DIALECT = process.env.DB_DIALECT ?? "postgres";

let dbConfig: any;

switch (DIALECT) {
  case "postgres":
    dbConfig = {
      database: process.env.PG_NAME,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      host: process.env.PG_HOST ?? "127.0.0.1",
      port: Number(process.env.PG_PORT) || 5432,
      dialect: "postgres",
      logging: false,
      // No timezone aquí para PG
    };
    break;

  case "mssql":
    dbConfig = {
      database: process.env.MSSQL_NAME,
      username: process.env.MSSQL_USER,
      password: process.env.MSSQL_PASS,
      host: process.env.MSSQL_HOST,
      port: Number(process.env.MSSQL_PORT) || 1433,
      dialect: "mssql",
      logging: false,
      dialectOptions: { options: { encrypt: false } },
      // timezone no necesario; MSSQL maneja TZ distinto
    };
    break;

  // ⚠️ Sequelize no soporta Oracle “oficialmente”.
  // Requiere un dialecto extra (p. ej. sequelize-oracle) y configuración distinta.
  case "oracle":
    dbConfig = {
      database: process.env.ORACLE_NAME,
      username: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASS,
      host: process.env.ORACLE_HOST,
      port: Number(process.env.ORACLE_PORT) || 1521,
      dialect: "oracle", // funcionará solo si usas un dialecto de comunidad
      logging: false,
      dialectOptions: {
        connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_SID}`,
      },
    };
    break;

  default: // mysql
    dbConfig = {
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST ?? "127.0.0.1",
      port: Number(process.env.DB_PORT) || 3306,
      dialect: "mysql",
      logging: false,
      // Si quieres TZ en MySQL, usa offset:
      // timezone: "-05:00",
    };
}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

export default sequelize;
export { sequelize };
