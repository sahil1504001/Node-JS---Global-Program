import express from 'express';
import { GroupController } from '../controllers/group.controller';
import { GroupValidator } from '../services/validation.service';

const gc = new GroupController();
const gv = new GroupValidator();

export const groupRouter = express.Router();

groupRouter
    .get('', gc.getAllGroups.bind(gc))
    .get('/:id', [gv.validateGroupId.bind(gv)], gc.findGroup.bind(gc))
    .post('', [gv.validatorGroupRequestPaylaod.bind(gv)], gc.createGroup.bind(gc))
    .put('/:id', [gv.validateGroupId.bind(gv), gv.validatorGroupRequestPaylaod.bind(gv)], gc.updateGroup.bind(gc))
    .delete('/:id', [gv.validateGroupId.bind(gv)], gc.deleteGroup.bind(gc));
