import express from 'express';
import { UserGroupController } from '../controllers/user-group.controller';

const ugc = new UserGroupController();

export const userGroupRouter = express.Router();

userGroupRouter
    .get('/', ugc.getAllMappings.bind(ugc))
    .post('/addUsersToGroup', ugc.addUsersToGroup.bind(ugc));
