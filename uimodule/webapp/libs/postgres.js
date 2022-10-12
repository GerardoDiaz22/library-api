const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'gerardo',
  host: 'localhost',
  database: 'library',
  password: 'www',
  port: 5432,
});


const getBooks = (req, res) => {
    
    const title = (typeof req.query.title === 'undefined') ? '' : req.query.title;
    const authors = (typeof req.query.authors === 'undefined') ? '' : req.query.authors;
    const category = (typeof req.query.category === 'undefined') ? '' : req.query.category;

    pool.query("SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) WHERE title ILIKE $1 AND author ILIKE $2 ORDER BY book_id",
    [title+'%',authors+'%'])
    .then((data) => {
        res.status(200).json(data.rows);
    })
    .catch((err) => {
        throw err
    });
    
    /*
        pool.query('SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) ORDER BY book_id', (err, data) => {
            if (err) {
                throw err;
            }
            res.status(200).json(data.rows);
        })
    */
}

const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) WHERE book_id = $1 ORDER BY book_id', [id])
    .then((data) => {
        res.status(200).json(data.rows);
    })
    .catch((err) => {
        throw err
    });
}

/*
const createBookAlt = (req, res) => {
    const { title, authors, subtitle, category, publish_date, editors, description, image_path, source } = req.body;
    
    pool.query('SELECT * FROM books WHERE title = $1', [title])
    .then((data) => {
        if (data.rows[0] != undefined) {
            res.status(200).send(`Book already added with ID: ${data.rows[0].book_id}`);
        }
        return pool.query('INSERT INTO books (title, source) VALUES ($1, $2) RETURNING *', [title, source])
    })
    .then((data) => {
        const book_id = data.rows[0].book_id;
    }).catch((err) => {
        throw err
    });
    
}*/

// TODO: Refactor createBook into createBookAlt (using then-catch handlers)
const createBook = (req, res) => {
    const { title, authors, subtitle, category, publish_date, editors, description, image_path, source } = req.body;

    pool.query('SELECT * FROM books WHERE title = $1', [title], (err, data) => {
        if (err) {
            throw err;
        }
        if (data.rows[0] != undefined) {
            res.status(200).send(`Book already added with ID: ${data.rows[0].book_id}`);
        }
        else {
            pool.query('INSERT INTO books (title, source) VALUES ($1, $2) RETURNING *', [title, source], (err, data) => {
                if (err) {
                    throw err;
                }
                const book_id = data.rows[0].book_id;
                pool.query('SELECT * FROM authors WHERE author = $1', [authors], (err, data) => {
                    if (err) {
                        throw err;
                    }
                    if (data.rows[0] != undefined) {
                        const author_id = data.rows[0].author_id;

                        pool.query('SELECT * FROM images WHERE image_path = $1', [image_path], (err, data) => {
                            if (data.rows[0] != undefined) {
                                const image_id = data.rows[0].image_id;
                                pool.query('INSERT INTO books_info(book_id, subtitle, category, publish_date, editors, description, author_id, image_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [book_id,subtitle,category, publish_date, editors, description, author_id, image_id], (err, data) => {
                                    if (err) {
                                        throw err;
                                    }
                                    res.status(200).send(`Book added with ID: ${data.rows[0].book_id}`);
                                });
                            }
                            else {
                                pool.query('INSERT INTO images (image_path) VALUES ($1) RETURNING *', [image_path], (err, data) => {
                                    if (err) {
                                        throw err;
                                    }
                                    const image_id = data.rows[0].image_id;
                                    pool.query('INSERT INTO books_info(book_id, subtitle, category, publish_date, editors, description, author_id, image_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [book_id,subtitle,category, publish_date, editors, description, author_id, image_id], (err, data) => {
                                        if (err) {
                                            throw err;
                                        }
                                        res.status(200).send(`Book added with ID: ${data.rows[0].book_id}`);
                                    });
                                });
                            }
                        });
                        
                    }
                    else {
                        pool.query('INSERT INTO authors (author) VALUES ($1) RETURNING *', [authors], (err, data) => {
                            if (err) {
                                throw err;
                            }
                            const author_id = data.rows[0].author_id;
                            pool.query('SELECT * FROM images WHERE image_path = $1', [image_path], (err, data) => {
                                if (data.rows[0] != undefined) {
                                    const image_id = data.rows[0].image_id;
                                    pool.query('INSERT INTO books_info(book_id, subtitle, category, publish_date, editors, description, author_id, image_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [book_id,subtitle,category, publish_date, editors, description, author_id, image_id], (err, data) => {
                                        if (err) {
                                            throw err;
                                        }
                                        res.status(200).send(`Book added with ID: ${data.rows[0].book_id}`);
                                    });
                                }
                                else {
                                    pool.query('INSERT INTO images (image_path) VALUES ($1) RETURNING *', [image_path], (err, data) => {
                                        if (err) {
                                            throw err;
                                        }
                                        const image_id = data.rows[0].image_id;
                                        pool.query('INSERT INTO books_info(book_id, subtitle, category, publish_date, editors, description, author_id, image_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [book_id,subtitle,category, publish_date, editors, description, author_id, image_id], (err, data) => {
                                            if (err) {
                                                throw err;
                                            }
                                            res.status(200).send(`Book added with ID: ${data.rows[0].book_id}`);
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
            });
        }
    });
    
}

const updateBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, subtitle, category, publish_date, editors, description, authors, image_path } = req.body;
  
    pool.query('UPDATE books SET title = $1 WHERE book_id = $2',[title, id])
    .then( () => {
        pool.query('UPDATE books_info SET subtitle = $1 WHERE book_id = $2',[subtitle, id])
    })
    .then( () => {
        pool.query('UPDATE books_info SET category = $1 WHERE book_id = $2',[category, id])
    })
    .then( () => {
        pool.query('UPDATE books_info SET publish_date = $1 WHERE book_id = $2',[publish_date, id])
    })
    .then( () => {
        pool.query('UPDATE books_info SET editors = $1 WHERE book_id = $2',[editors, id])
    })
    .then( () => {
        pool.query('UPDATE books_info SET description = $1 WHERE book_id = $2',[description, id])
    })
    .then( () => {
        pool.query('UPDATE books_info SET subtitle = $1 WHERE book_id = $2',[subtitle, id])
    })
    .then( () => {
        return pool.query('SELECT author_id FROM books_info WHERE book_id = $1',[id]).rows[0].author_id;
    })
    .then( (author_id) => {
        pool.query('UPDATE authors SET author = $1 WHERE author_id = $2',[authors,author_id]);
    })
    .then( () => {
        return pool.query('SELECT image_id FROM books_info WHERE book_id = $1',[id]).rows[0].image_id;
    })
    .then( (image_id) => {
        pool.query('UPDATE images SET image_path = $1 WHERE image_id = $2',[image_path, image_id]);
    })
    .then( () => {
        res.status(200).send(`Book modified with ID: ${id}`);
    })
    .catch( (err) => {
        throw err;
    });

}


const deleteBookById = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query('DELETE FROM books_info WHERE book_id = $1', [id])
    .then( () => {
        pool.query('DELETE FROM books WHERE book_id = $1', [id]);
    })
    .then( () => {
        res.status(200).send(`Book deleted with ID: ${id}`);
    })
    .catch( (err) => {
        throw err;
    });
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById
}