import { Request, Response, NextFunction } from "express";
import { array, number, object, string } from "joi";

export class GroupValidator {
  private readonly groupSchema = object({
    name: string().required().regex(/^[\w\s]+$/).min(5).max(100).label('Name').messages({
      "string.pattern.base": "Group name can only have string numbers, underscore and space"
    }),
    permissions: array().items(string().required().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')).required()
    .label('Permission')
  });

  private readonly idSchema = object({
    id: string().required().uuid()
    .label('ID')
  });

  private readonly suggestQuerySchema = object({
    search: string().required().alphanum(),
    limit: number().max(10000)
  });

  validateGroupRequestPayload(req: Request, res: Response, next: NextFunction) {
    const validation = this.groupSchema.validate(req.body);

    if (validation.error && validation.error.isJoi) {
      res.status(400).json(validation.error.details[0]);
    } else {
      next();
    }
  }

  validateGroupId(req: Request, res: Response, next: NextFunction) {
    const validation = this.idSchema.validate(req.params);

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