import { Sequelize } from 'sequelize/types';
import { DbConfig } from '../src/HT-3/data-access/db.service';

let db: Sequelize;
beforeAll(async () => {
  db = await DbConfig.initDb();
});

afterAll(() => {
  db.close();
});
