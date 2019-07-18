/* eslint-disable consistent-return */
/* eslint-disable no-console */
import db from '../models/db';

class Book {
    /* create */
    static async create(req, res) {
        // admin only
        if (req.userType !== 'admin') {
            return res.status(401).json({
                error: 'unauthorized access',
            });
        }

        const text = `INSERT INTO
      books("serialNumber", title, price)
      VALUES ($1, $2, $3) RETURNING*`;

        const values = [
            req.body.serialNumber,
            req.body.title,
            req.body.price,
        ];

        try {
            const checkBook = await db.query('SELECT * FROM books WHERE "serialNumber"=$1 AND title=$2 AND price=$3', [req.body.seriaNumber, req.body.title, req.body.price]);

            if (checkBook.rows.length > 0) {
                return res.status(200).json({
                    status: 200,
                    error: 'Sorry, this book is already registered',
                });
            }
            const {
                rows,
            } = await db.query(text, values);

            if (rows.length > 0) {
                rows[0].createdOn = new Date(rows[0].createdOn).toDateString();
                return res.status(201).json({
                    message: ' book registered successfully',
                    status: 201,
                    data: rows[0],
                });
            }

            return res.status(400).json({
                status: 400,
                error: 'Book not registered!',
            });
        } catch (error) {
            console.log(error);
        }
    }

    /* get all books */
    static async getAllBooks(req, res) {
        try {
            const {
                rows,
            } = await db.query('SELECT * FROM books ORDER BY price DESC');
            if (rows.length > 0) {
                return res.status(200).json({
                    status: 200,
                    data: rows,
                });
            }
            return res.status(400).json({
                status: 404,
                error: 'No books found',
            });
        } catch (error) {
            console.log(error);
        }
    }

    /* get on book by id */
    static async getBook(req, res) {
        try {
            const {
                rows,
            } = await db.query('SELECT * FROM books WHERE id=$1', [req.params.bookId]);
            if (rows.length > 0) {
                rows[0].createdOn = new Date(rows[0].createdOn).toDateString();
                return res.status(200).json({
                    status: 200,
                    data: rows[0],
                });
            }
            return res.status(400).json({
                status: 404,
                error: 'This book is not in our database',
            });
        } catch (error) {
            console.log(error);
        }
    }

    /* delete a book */
    static async deleteBook(req, res) {
        // admin only
        if (req.userType !== 'admin') {
            return res.status(401).json({
                error: 'unauthorized access',
            });
        }
        try {
            const {
                rows,
            } = await db.query('DELETE FROM books WHERE id=$1 RETURNING *', [req.params.bookId]);

            if (rows.length > 0) {
                return res.json({
                    status: 204,
                    message: 'Book deleted',
                });
            }

            return res.status(400).json({
                status: 400,
                error: 'Book doesn\'t exist',
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default Book;