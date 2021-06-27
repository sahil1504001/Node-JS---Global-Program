import { Sequelize } from "sequelize";
import config from "../config/dev.json";


type TypeDbConfig = {
  host: string; port: number; username: string; password: string; database: string; dialect: string;
};

export class DbConfig {
  static db: Sequelize;
  static dbConfig: TypeDbConfig = {
    host: process.env.DB_HOST || config.db.host,
    port: Number(process.env.DB_PORT) || config.db.port,
    username: process.env.DB_USERNAME || config.db.username,
    password: process.env.DB_PASSWORD || config.db.password,
    database: process.env.DB_DATABASE || config.db.database,
    dialect: process.env.DB_DIALECT || config.db.dialect
  };

  static initDb() {
    this.db = new Sequelize(this.dbConfig.database, this.dbConfig.username, this.dbConfig.password, {
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      dialect: this.dbConfig.dialect as any
    });
    this.db.sync();
    return this.db;
  }

  getDatabase(): Sequelize {
    if (!DbConfig.db) {
      DbConfig.initDb();
    }
    return DbConfig.db
  }
};