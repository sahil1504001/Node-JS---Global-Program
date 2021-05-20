import { Request, Response, NextFunction } from "express";
import { number, object, string } from "joi";

export class UserValidator {
  private readonly userSchema = object({
    login: string().required().alphanum().min(5).max(100),
    password: string().required().alphanum().min(8).max(255),
    age: number().required().min(4).max(130).messages({
      'number.required': 'Age is a requred attribute',
      'number.min': 'Age cannot be less than 4 years',
      'number.max': 'Age cannot be more than 130 years',
    }).label('Age')
  });

  private readonly userIdSchema = object({
    id: string().required().uuid()
    .label('ID')
  });

  private readonly suggestQuerySchema = object({
    search: string().required().alphanum(),
    limit: number().max(10000)
  });

  validateUserRequestPayload(req: Request, res: Response, next: NextFunction) {
    const validation = this.userSchema.validate(req.body);

    if (validation.error && validation.error.isJoi) {
      res.status(400).json(validation.error.details[0]);
    } else {
      next();
    }
  }

  validateUserId(req: Request, res: Response, next: NextFunction) {
    const validation = this.userIdSchema.validate(req.params);

    if (validation.error && validation.error.isJoi) {
      res.status(400).json(validation.error.details[0]);
    } else {
      next();
    }
  }

  validateSuggestQueryParams(req: Request, res: Response, next: NextFunction) {
    const validation = this.suggestQuerySchema.validate(req.query);

    if (validation.error && validation.error.isJoi) {
      res.status(400).json(validation.error.details[0]);
    } else {
      next();
    }
  }
}