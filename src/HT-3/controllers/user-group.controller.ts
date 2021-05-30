import { Request, Response } from 'express';
import { UserGroupService } from '../services/userGroup.service';
import {CustomLogger} from '../logger/custom-logger';

const logger = CustomLogger.logger;

enum RESPONSE_CODES {
  BAD_REQUEST = 400,
  CREATED = 201,
  NOT_FOUND = 404
};

export class UserGroupController {
  private readonly userGroupService = new UserGroupService();

  addUsersToGroup(req: Request, res: Response) {
    const { groupId, userIds } = req.body;
    this.userGroupService.addUsersToGroup(groupId, userIds)
      .then(response => res.json(response))
      .catch(err => {
        const resp = `Unable to add users to Group, following errors happened - ${JSON.stringify(err)}`;
        logger.error({message: resp, method: 'UserGroupController -> addUsersToGroup', requestParams: JSON.stringify(req.params)});
        res.status(RESPONSE_CODES.BAD_REQUEST).json(err);
      });
  }

  getAllMappings(req: Request, res: Response) {
    return this.userGroupService.getAllMappings()
      .then(response => res.json(response))
      .catch(err => {
        const resp = `Unable to add users to Group, following errors happened - ${JSON.stringify(err)}`;
        logger.error({message: resp, method: 'UserGroupController -> addUsersToGroup', requestParams: JSON.stringify(req.params)});
        res.status(RESPONSE_CODES.BAD_REQUEST).json(err);
      });
  }
}