import { Request, Response } from 'express';
import { GroupService } from '../services/group.service';
import { RESPONSE_CODES } from '../enums/response.enum';
import { ValidationError } from 'sequelize';

export class GroupController {
    readonly RESPONSE_CODES = RESPONSE_CODES;
    private readonly groupService = new GroupService();

    getAllGroups(req: Request, res: Response) {
        this.groupService.getAllGroups()
        .then(response => res.json(response))
        .catch(err => res.status(this.RESPONSE_CODES.BAD_REQUEST).json(err));
    }

    createGroup(req: Request, res: Response) {
        this.groupService.createGroup(req.body)
        .then(response => res.status(this.RESPONSE_CODES.CREATED).json(response))
        .catch((err: ValidationError) => res.status(400).json(err.errors[0].message));
    }

    findGroup(req: Request, res: Response) {
        this.groupService.findGroup(req.params.id)
        .then(response => {
            if (response) {
                res.json(response);
            } else {
                res.sendStatus(this.RESPONSE_CODES.NOT_FOUND);
            }
        })
    }

    updateGroup(req: Request, res: Response) {
        this.groupService.updateGroup(req.params.id, req.body)
        .then((response) => {
          if (response[0] > 0) {
            res.json({
              message: `${req.params.id} updated successfully`
            });
          } else {
            res.sendStatus(this.RESPONSE_CODES.NOT_FOUND);
          }
        })
        .catch(() => res.status(400).json({
          message: `Error updating ${req.params.id}`
        }));
    }

    deleteGroup(req: Request, res: Response) {
        this.groupService.deleteGroup(req.params.id)
        .then(response => {
            if (response > 0) {
                res.json({
                  message: `${req.params.id} deleted successfully`
                });
              } else {
                res.sendStatus(this.RESPONSE_CODES.NOT_FOUND);
              }
        }).catch(() => res.status(400).json({
            message: `Error deleting ${req.params.id}`
        }));
    }
}