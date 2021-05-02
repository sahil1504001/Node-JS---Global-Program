import { DataTypes, UUIDV4 } from "sequelize";
import { DBConfig } from "../database-access/db.service";


const dbCon = new DBConfig();

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

type GroupTypes = {
    id: string,
    name: string,
    permissions: Array<Permission>
}

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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
});
