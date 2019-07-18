/* eslint-disable consistent-return */
/* eslint-disable no-console */
import db from '../models/db';
import Validate from '../helpers/Validate';

class Book {
    /* create */
    static async create(req, res) {
        // admin only
        if (req.userType !== 'admin') {
            return res.status(401).json({
                error: 'unauthorized access',
            });
        }
        // Validate inputs
        // const checkInputs = [];
        // checkInputs.push(Validate.string(req.body.location, true));
        // checkInputs.push(Validate.string(req.body.topic, true));

        // for (let i = 0; i < checkInputs.length; i += 1) {
        //     if (checkInputs[i].isValid === false) {
        //         return res.status(400).json({
        //             status: 400,
        //             error: checkInputs[i].error,
        //         });
        //     }
        // }

        const text = `INSERT INTO
      books("serialNumber", title, price)
      VALUES($1, $2, $3) RETURNING *`;

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
                    messsage: 'Books successfuly registered',
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
            } = await db.query('SELECT * FROM books');
            if (rows.length > 0) {
                const books = [];
                rows.forEach((book) => {
                    books.createdOn = new Date(book.createdOn).toDateString();
                    books.push(book);
                });
                return res.status(200).json({
                    status: 200,
                    data: books,
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

    /** get book by price */
    static async getBookByPrice(req, res) {
        try {
            const {
                rows,
            } = await db.query('SELECT * FROM books WHERE id=$1', [req.params.price]);
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

    /* delete a meetup */
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