import express from 'express';
import { UserValidator } from "../services/userValidator.service";
import { UserController } from '../controllers/user.controller';

const uv = new UserValidator();
const uc = new UserController();

export const userRouter = express.Router();

userRouter.get('', uc.getActiveUsers.bind(uc))
  .post('/login', uv.validateLoginPayload.bind(uv), uc.login.bind(uc))
  .get('/suggest', uv.validateSuggestQueryParams.bind(uv) , uc.getAutoSuggestUsers.bind(uc))
  .get('/:id', uv.validateUserId.bind(uv), uc.findUser.bind(uc))
  .post('/create', uv.validateUserRequestPayload.bind(uv), uc.createUser.bind(uc))
  .put('/:id', [
    uv.validateUserId.bind(uv),
    uv.validateUserRequestPayload.bind(uv)
  ],uc.updateUser.bind(uc))
  .delete('/delete/:id', uv.validateUserId.bind(uv), uc.deleteUser.bind(uc))
  .delete('/:id', uv.validateUserId.bind(uv), uc.softDeleteUser.bind(uc));
