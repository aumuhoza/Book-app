import express from 'express';
import Book from '../../controllers/books';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router();

router.post('/', verifyToken, Book.create);
router.get('/', verifyToken, Book.getAllBooks);
router.get('/:bookId', verifyToken, Book.getBook);

export default router;