import { DbConfig } from "../data-access/db.service";
import { DataTypes, UUIDV4 } from 'sequelize';
import { Group } from "./Group.model";
import { User } from "./User.model";

const dbConnection = new DbConfig();

export const UserGroup = dbConnection.getDatabase()
.define('UserGroup', {
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  GroupId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Group,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
});

User.belongsToMany(Group, {
  through: UserGroup
});

Group.belongsToMany(User, {
  through: UserGroup
});

(async () => {
  await UserGroup.sync({alter: true});
})();

