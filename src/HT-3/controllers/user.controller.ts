import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { UserService } from "../services/user.service";
import { CustomLogger } from '../logger/custom-logger';

enum RESPONSE_CODES {
  BAD_REQUEST = 400,
  CREATED = 201,
  NOT_FOUND = 404
}

export class UserController {
  private readonly userService = new UserService();
  private readonly logger = CustomLogger.logger;

  getActiveUsers(req: Request, res: Response) {
    this.userService.getActiveUsers()
      .then(response => res.json(response))
      .catch(err => {
        const resp = `Failed to getActiveUsers - ${JSON.stringify(err)}`;
        this.logger.error({message: resp, method: 'UserController -> getActiveUsers', requestParams: JSON.stringify(req.params)});
        res.status(RESPONSE_CODES.BAD_REQUEST).json(resp);
      });
  }

  getAutoSuggestUsers(req: Request, res: Response) {
    const { search, limit } = req.query;
    this.userService.getAutoSuggestUsers(search as string, limit as unknown as number)
      .then(respone => res.json(respone))
      .catch(error => {
        const resp = `Failed to getAutoSuggestUsers  - ${JSON.stringify(error)}`;
        this.logger.error({message: resp, method: 'UserController -> getAutoSuggestUsers', requestParams: JSON.stringify(req.params)});
        res.status(RESPONSE_CODES.BAD_REQUEST).json(resp);
      });
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
        const resp = `Failed to find user - ${JSON.stringify(err)}`;
        this.logger.error({message: resp, method: 'UserController -> findUser', requestParams: JSON.stringify(req.params)});
        console.log(err); res.status(400).json(resp);
      });
  }

  createUser(req: Request, res: Response) {
    this.userService.createUser(req.body)
    .then(response => res.status(RESPONSE_CODES.CREATED).json(response))
    .catch((err: ValidationError) => {
      const resp = `Failed to create user - ${JSON.stringify(err.errors)}`;
      this.logger.error({message: resp, method: 'UserController -> createUser', requestParams: JSON.stringify(req.params)});
      res.status(400).json(resp);
    });
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
    .catch((err) => {
      const resp = `Error updating ${req.params.id} ${err}`;
      this.logger.error({message: resp, method: 'UserController -> updateUser', requestParams: JSON.stringify(req.params)});
      res.status(400).json({
        message: resp
      });
    });
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
    .catch((err) => {
      const resp = `Error deleting ${req.params.id} ${err}`;
      this.logger.error({message: resp, method: 'UserController -> softDeleteUser', requestParams: JSON.stringify(req.params)});
      res.status(400).json({
        message: resp
      });
    });
  }

  deleteUser(req: Request, res: Response) {
    this.userService.deleteUser(req.params.id)
      .then(() => res.status(200).json({ message: `${req.params.id} deleted successfully` }))
      .catch((err) => {
        const resp = `Error deleting ${req.params.id} ${err}`;
        this.logger.error({message: resp, method: 'UserController -> deleteUser', requestParams: JSON.stringify(req.params)});
        res.status(400).json({
          message: resp
        });
      });
  }
}