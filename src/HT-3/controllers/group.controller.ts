import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { GroupService } from "../services/group.service";

enum RESPONSE_CODES {
  BAD_REQUEST = 400,
  CREATED = 201,
  NOT_FOUND = 404
}

export class GroupController {
  private readonly groupService = new GroupService();

  getAllGroups(req: Request, res: Response) {
    this.groupService.getActiveGroups()
      .then(response => res.json(response))
      .catch(err => res.status(RESPONSE_CODES.BAD_REQUEST).json(err));
  }

  findGroup(req: Request, res: Response) {
    this.groupService.findGroup(req.params.id)
      .then((response) => {
        if (response) {
          res.json(response);
        } else {
          res.sendStatus(RESPONSE_CODES.NOT_FOUND);
        }
      })
      .catch((err) => res.status(400).json(err));
  }

  createGroup(req: Request, res: Response) {
    this.groupService.createGroup(req.body)
    .then(response => res.status(RESPONSE_CODES.CREATED).json(response))
    .catch((err: ValidationError) => res.status(400).json(err));
  }

  updateGroup(req: Request, res: Response) {
    this.groupService.updateGroup(req.params.id, req.body)
    .then((response) => {
      if (response[0] > 0) {
        res.json({
          message: `${req.params.id} updated successfully`
        });
      } else {
        res.sendStatus(RESPONSE_CODES.NOT_FOUND);
      }
    })
    .catch(() => res.status(400).json({
      message: `Error updating ${req.params.id}`
    }));
  }

  deleteGroup(req: Request, res: Response) {
    this.groupService.deleteGroup(req.params.id)
    .then((response) => {
      if (response > 0) {
        res.json({
          message: `${req.params.id} deleted successfully`
        });
      } else {
        res.sendStatus(RESPONSE_CODES.NOT_FOUND);
      }
    })
    .catch(() => res.status(400).json({
      message: `Error deleting ${req.params.id}`
    }));
  }
}