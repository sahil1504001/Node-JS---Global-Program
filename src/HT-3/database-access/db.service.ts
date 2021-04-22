import { Sequelize } from 'sequelize';
import config from '../config/dbConfig.json';

export class DBConfig {
    static db: Sequelize;
    static dbConfig = config.db;

    static init() {
        this.db = new Sequelize(this.dbConfig.database, this.dbConfig.username, this.dbConfig.password, {
            host: this.dbConfig.host,
            port: this.dbConfig.port,
            dialect: this.dbConfig.dialect as any
        });
        this.db.sync();
        return this.db;
    }

    getDatabase(): Sequelize {
        if (!DBConfig.db) {
            DBConfig.init();
        }
        return DBConfig.db;
    }
}
