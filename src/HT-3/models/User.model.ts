import { DataTypes, UUIDV4 } from 'sequelize';
import { DBConfig } from '../database-access/db.service';

const dbCon = new DBConfig();

export const User = dbCon.getDatabase()
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
            is: ['^[A-Za-z0-9]+$', 'i']
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 4,
            max: 30
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
