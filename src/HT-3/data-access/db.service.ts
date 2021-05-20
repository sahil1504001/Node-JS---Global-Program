import { Sequelize } from "sequelize";
import config from "../config/dev.json";

export class DbConfig {
  static db: Sequelize;
  static dbConfig = config.db;

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