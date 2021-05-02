import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { UserService } from "../services/user.service";
import { RESPONSE_CODES } from '../enums/response.enum';

export class UserController {
  readonly RESPONSE_CODES = RESPONSE_CODES;
  private readonly userService = new UserService();

  getActiveUsers(req: Request, res: Response) {
    this.userService.getActiveUsers()
      .then(response => res.json(response))
      .catch(err => res.status(this.RESPONSE_CODES.BAD_REQUEST).json(err));
  }

  getAutoSuggestUsers(req: Request, res: Response) {
    const { search, limit } = req.query;
    this.userService.getAutoSuggestUsers(search as string, limit as unknown as number)
      .then(respone => res.json(respone))
      .catch(error => res.status(this.RESPONSE_CODES.BAD_REQUEST).json(error));
  }

  findUser(req: Request, res: Response) {
    this.userService.findUser(req.params.id)
      .then((response) => {
        if (response) {
          res.json(response);
        } else {
          res.sendStatus(this.RESPONSE_CODES.NOT_FOUND);
        }
      })
      .catch((err) => res.status(400).json(err));
  }

  createUser(req: Request, res: Response) {
    this.userService.createUser(req.body)
    .then(response => res.status(this.RESPONSE_CODES.CREATED).json(response))
    .catch((err: ValidationError) => res.status(400).json(err.errors[0].message));
  }

  updateUser(req: Request, res: Response) {
    this.userService.updateUser(req.params.id, req.body)
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

  deleteUser(req: Request, res: Response) {
    this.userService.deleteUser(req.params.id)
    .then((response) => {
      if (response[0] > 0) {
        res.json({
          message: `${req.params.id} deleted successfully`
        });
      } else {
        res.sendStatus(this.RESPONSE_CODES.NOT_FOUND);
      }
    })
    .catch(() => res.status(400).json({
      message: `Error deleting ${req.params.id}`
    }));
  }
}
