import express, { Application  } from 'express';
import { userRouter } from './routers/user.router';
import { groupRouter } from './routers/group.router';
import { DbConfig } from './data-access/db.service';
import { userGroupRouter } from './routers/user-group.router';
import morgan from 'morgan';
import { CustomLogger } from './logger/custom-logger';
import { unhandledRejectionHandler, unhandledErrorHandler } from './handlers/handlers';
import { checkToken } from './token-manager/tokenManager';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.port || 3000;
const logger = CustomLogger.logger;

morgan.token('reqBody', (req: any, res) => JSON.stringify(req['originalBody']));

app.use(morgan(':method :url :status :response-time ms :reqBody'));

DbConfig.initDb();

app.use(express.json());
app.use(cors());
app.use(checkToken);
app.set('x-powered-by', false);

app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/userGroup', userGroupRouter);
app.use(unhandledErrorHandler);

app.listen(PORT, () => {
  const details = `Server started on port ${PORT}`;
  console.log(details);
  logger.info(details);
});

// Unhandled promise rejection
process.on('unhandledRejection', unhandledRejectionHandler);
