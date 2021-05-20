import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { UserService } from "../services/user.service";

enum RESPONSE_CODES {
  BAD_REQUEST = 400,
  CREATED = 201,
  NOT_FOUND = 404
}

export class UserController {
  private readonly userService = new UserService();

  getActiveUsers(req: Request, res: Response) {
    this.userService.getActiveUsers()
      .then(response => res.json(response))
      .catch(err => res.status(RESPONSE_CODES.BAD_REQUEST).json(err));
  }

  getAutoSuggestUsers(req: Request, res: Response) {
    const { search, limit } = req.query;
    this.userService.getAutoSuggestUsers(search as string, limit as unknown as number)
      .then(respone => res.json(respone))
      .catch(error => res.status(RESPONSE_CODES.BAD_REQUEST).json(error));
  }

  findUser(req: Request, res: Response) {
    this.userService.findUser(req.params.id)
      .then((response) => {
        if (response) {
          res.json(response);
        } else {
          res.sendStatus(RESPONSE_CODES.NOT_FOUND);
        }
      })
      .catch((err) => { 
        console.log(err); res.status(400).json(err)
      });
  }

  createUser(req: Request, res: Response) {
    this.userService.createUser(req.body)
    .then(response => res.status(RESPONSE_CODES.CREATED).json(response))
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
        res.sendStatus(RESPONSE_CODES.NOT_FOUND);
      }
    })
    .catch(() => res.status(400).json({
      message: `Error updating ${req.params.id}`
    }));
  }

  softDeleteUser(req: Request, res: Response) {
    this.userService.softDeleteUser(req.params.id)
    .then((response) => {
      if (response[0] > 0) {
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

  deleteUser(req: Request, res: Response) {
    this.userService.deleteUser(req.params.id)
      .then(() => res.status(200).json({ message: `${req.params.id} deleted successfully` }))
      .catch(() => res.status(400).json({
        message: `Error deleting ${req.params.id}`
      }));
  }
}