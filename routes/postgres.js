const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'gerardo',
  host: 'localhost',
  database: 'library',
  password: 'www',
  port: 5432,
});


const getBooks = (req, res) => {
    pool.query('SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) ORDER BY book_id', (err, data) => {
        if (err) {
            throw err;
        }
        res.status(200).json(data.rows);
    })
}


const getBookById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) WHERE book_id = $1 ORDER BY book_id', [id], (err, data) => {
        if (err) {
            throw err;
        }
        res.status(200).json(data.rows);
    });
}
/*
    -> POST book
    INSERT INTO books(title, source) VALUES($1,$2) RETURNING *;
    INSERT INTO authors(author) VALUES($1) RETURNING *;
    INSERT INTO images(image_path) VALUES($1) RETURNING *;
    INSERT INTO books_info(book_id, subtitle, category, publish_date, editors, description, author_id, image_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;
*/

const createBook = (req, res) => {
    const { title, authors, subtitle, category, publish_date, editors, description, image, source } = req.body;
    
    pool.query('INSERT INTO books (title, source) VALUES ($1, $2) RETURNING *', [title, source], (err, data) => {
        if (err) {
            throw err;
        }
        const book_id = data.rows[0].book_id;
    });

    pool.query('INSERT INTO authors (author) VALUES ($1) RETURNING *', [authors], (err, data) => {
        if (err) {
            throw err;
        }
        const author_id = data.rows[0].author_id;
    });

    pool.query('INSERT INTO images (image_path) VALUES ($1) RETURNING *', [image], (err, data) => {
        if (err) {
            throw err;
        }
        const image_id = data.rows[0].image_id;
    });

    pool.query('INSERT INTO books_info(book_id, subtitle, category, publish_date, editors, description, author_id, image_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [book_id,subtitle,category, publish_date, editors, description, author_id, image_id], (err, data) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`Book added with ID: ${data.rows[0].boo_info_id}`)
    });
}

/*
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (err, data) => {
        if (err) {
          throw err
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (err, data) => {
      if (err) {
        throw err
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
}
*/

module.exports = {
    getBooks,
    getBookById,
    createBook
  }
/*
   
-> GET all books
SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) ORDER BY book_id;

-> GET book by ID
SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) WHERE book_id = $1 ORDER BY book_id;

-> GET book by author
SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) WHERE author = $1 ORDER BY book_id;

-> GET book by category
SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) WHERE category = $1 ORDER BY book_id;

-> POST book
INSERT INTO books(title, source) VALUES($1,$2) RETURNING *;
INSERT INTO books_info(book_id, subtitle, category, publish_date, editors, description, author_id, image_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;
INSERT INTO authors(author) VALUES($1) RETURNING *;
INSERT INTO images(image_path) VALUES($1) RETURNING *;

-> PUT att book by ID
UPDATE books SET title = $1 WHERE book_id = $2;
UPDATE books_info SET subtitle = $1 WHERE book_id = $2;
UPDATE books_info SET category = $1 WHERE book_id = $2;
UPDATE books_info SET publish_date = $1 WHERE book_id = $2;
UPDATE books_info SET editors = $1 WHERE book_id = $2;
UPDATE books_info SET description = $1 WHERE book_id = $2;
UPDATE books_info SET author_id = $1 WHERE book_id = $2;
UPDATE books_info SET image_id = $1 WHERE book_id = $2;

-> DELETE book by ID
DELETE FROM books WHERE book_id = $1;
DELETE FROM books_info WHERE book_id = $1;
*/
