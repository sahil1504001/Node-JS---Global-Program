import { DbConfig } from "../data-access/db.service";
import { DataTypes, UUIDV4 } from 'sequelize';

const dbConnection = new DbConfig();

const PERMISSION_TYPES = DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

export const Group  = dbConnection.getDatabase()
.define('Group', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  permissions: {
    type: DataTypes.ARRAY(PERMISSION_TYPES),
    allowNull: false
  }
});
