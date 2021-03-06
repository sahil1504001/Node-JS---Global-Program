import { DbConfig } from "../data-access/db.service";
import { DataTypes, UUIDV4 } from 'sequelize';

const dbConnection = new DbConfig();

export const User  = dbConnection.getDatabase()
.define('User', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  login: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(600),
    allowNull: false,
    validate: {
      is: ['^[a-zA-Z0-9]+$','i']
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 4,
      max: 130
    }
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});
