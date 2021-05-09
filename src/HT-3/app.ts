import express, { Application  } from 'express';
import { userRouter } from './routers/user.router';
import { groupRouter } from './routers/group.router';
import { DbConfig } from './data-access/db.service';

const app: Application = express();
const PORT = process.env.port || 3000;
DbConfig.initDb();

app.use(express.json());
app.set('x-powered-by', false);

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT)
});
