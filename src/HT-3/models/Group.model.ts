import { DataTypes, UUIDV4 } from "sequelize";
import { DBConfig } from "../database-access/db.service";


const dbCon = new DBConfig();

export const PERMISSION_TYPES = DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

export const Group = dbCon.getDatabase()
.define('Group', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(PERMISSION_TYPES),
        allowNull: false
    }
});
