import express from 'express';
import user from './users/auth';
import Book from './books/books';

const app = express();
app.use('/auth', user);
app.use('/books', Book);

export default app;