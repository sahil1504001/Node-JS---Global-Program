import { Request, Response } from 'express';
import { UserGroupService } from '../services/userGroup.service';

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
      .catch(err => res.status(RESPONSE_CODES.BAD_REQUEST).json(err));
  }

  getAllMappings(req: Request, res: Response) {
    return this.userGroupService.getAllMappings()
      .then(response => res.json(response))
      .catch(err => res.status(RESPONSE_CODES.BAD_REQUEST).json(err));
  }
}