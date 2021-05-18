import express from 'express';
import { GroupValidator } from '../services/groupValidator.service';
import { GroupController } from '../controllers/group.controller';

const gc = new GroupController();
const gv = new GroupValidator

export const groupRouter = express.Router();

groupRouter.get('', gc.getAllGroups.bind(gc))
  .get('/:id', gv.validateGroupId.bind(gv), gc.findGroup.bind(gc))
  .post('', gv.validateGroupRequestPayload.bind(gv), gc.createGroup.bind(gc))
  .put('/:id', gv.validateGroupRequestPayload.bind(gv), gc.updateGroup.bind(gc))
  .delete('/:id', gv.validateGroupId.bind(gv), gc.deleteGroup.bind(gc));
