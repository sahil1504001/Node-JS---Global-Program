import { AbstractDataTypeConstructor, Error, UUIDV4 } from "sequelize";
import { DbConfig } from "../data-access/db.service";
import { Group } from "../models/Group.model";
import { User } from "../models/User.model";
import { UserGroup } from "../models/UserGroup.model";

export class UserGroupService {

  addUsersToGroup(GroupId: string, userIds: Array<string>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const transaction = await DbConfig.db.transaction();
      const userGroupPayload: Array<{ UserId: string, GroupId: string, id: any }> = [];
      
      try {
        userIds.forEach(_ => userGroupPayload.push({ UserId: _, GroupId, id: UUIDV4 }));

        const response = await UserGroup.bulkCreate(userGroupPayload);
        await transaction.commit();

        resolve({ message: `Users added to Group successfully`, response });
      } catch (error) {
        transaction.rollback();
        const errors = [];
        if (Array.isArray(error?.errors)) {
          error?.errors?.forEach((_: any) => errors.push(_.message));
        } else {
          errors.push(error.message);
        }
        reject({ message: `Unable to add users to group`, errors });
      }
    });
  }

  getAllMappings() {
    return UserGroup.findAll();
    // UserGroup.drop();
    // User.drop();
    // Group.drop();
    // return User.drop();
  }
}
