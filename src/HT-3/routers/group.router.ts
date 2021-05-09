import express from 'express';
import { GroupValidator } from '../services/groupValidator.service';
import { GroupController } from './controllers/group.controller';

const gc = new GroupController();
const gv = new GroupValidator

export const groupRouter = express.Router();

groupRouter.get('', gc.getActiveUsers.bind(gc))
  .get('/suggest', gv.validateSuggestQueryParams.bind(gv), gc.getAutoSuggestUsers.bind(gc))
  .get('/:id', gv.validateGroupId.bind(gv), gc.findUser.bind(gc))
  .post('', gv.validateGroupRequestPayload.bind(gv), gc.createUser.bind(gc))
  .put('/:id', gv.validateGroupRequestPayload.bind(gv), gc.updateUser.bind(gc))
  .delete('/:id', gv.validateGroupId.bind(gv), gc.deleteUser.bind(gc));
