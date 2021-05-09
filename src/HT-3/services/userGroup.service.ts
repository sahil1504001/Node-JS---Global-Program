import { UserGroups } from '../models/UserGroups.model';

export class UserGroupService {

  addUserToGroup(userId: any, groupId: any) {
    return UserGroups.create({groupId, userId})
    .catch((error: any) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { name: error.name, message: 'User is alrady associated with the group' }
      } else if (error.name === 'SequelizeForeignKeyConstraintError') {
        if (error.index === "UserGroups_userId_fkey") {
          return { name: error.name, message: `User with id ${userId} not present` }
        }
        if (error.index === "UserGroups_groupId_fkey") {
          return { name: error.name, message: `Group ${groupId} is not present` }
        }
      } else {
        return error;
      }
    });
  }

  removeUserFromroup(userId: any, groupId: any) {
    return UserGroups.destroy({
      where: {groupId, userId}
    });
  }
}
