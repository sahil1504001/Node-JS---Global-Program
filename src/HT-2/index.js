const express = require('express');
const userRouter = require('./user.routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Bad Request!');
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
