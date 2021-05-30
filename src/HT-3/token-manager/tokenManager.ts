import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from "../config/dev.json";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  // skipping token for login
  if (req.url === `/users/login` || req.url === `/users/create`) {
    return next();
  }
 
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ status: 401, message: `No token provided.` });
  }

  return jwt.verify(token.substring(7), config.token.secret, (err) => {
    if (err) {
      return res.status(403).send({ status: 403, message: `Failed to authenticate token.` });
    }
    return next();
  });
};
