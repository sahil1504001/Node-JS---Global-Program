import express, { Application } from 'express';
import { DBConfig } from './database-access/db.service';
import { userRouter } from './routers/user.router';

const app: Application = express();
const PORT = process.env.port || 3000;
DBConfig.init();

app.use(express.json());
app.set('x-powered-by', false);

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log('API server is running on port : ', PORT);
});
