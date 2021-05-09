import { DbConfig } from "../data-access/db.service";
import { DataTypes } from 'sequelize';
import { Group } from "./Group.model";
import { User } from "./User.model";

const dbConnection = new DbConfig();

export const UserGroups  = dbConnection.getDatabase()
.define('UserGroups', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  groupId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, { timestamps: false });

Group.belongsToMany(User, {
  through: UserGroups,
  as: 'users',
  foreignKey: 'groupId'
});

User.belongsToMany(Group, {
  through: UserGroups,
  as: 'groups',
  foreignKey: 'userId'
});
