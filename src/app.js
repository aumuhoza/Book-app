import express from 'express';
import usersRouter from './routes/users/auth';
import bookRouter from './routes/books/books';
const app = express();

// db.connect();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    }),
);

app.use('/auth', usersRouter);
app.use('/books', bookRouter);


export default app;