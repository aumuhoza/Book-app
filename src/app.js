import express from 'express';
import usersRouter from './routes/users/auth';

const app = express();

// db.connect();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    }),
);

app.use('/auth', usersRouter);


export default app;