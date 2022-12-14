const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'gerardo',
  host: 'localhost',
  database: 'library',
  password: 'www',
  port: 5432,
});

const axios = require('axios');

const getBooks = async(req, res, next) => {
    
    const title = (typeof req.query.title === 'undefined') ? '' : req.query.title;
    const source = (typeof req.query.source === 'undefined') ? '' : req.query.source;
    const authors = (typeof req.query.authors === 'undefined') ? '' : req.query.authors;
    const editors = (typeof req.query.editors === 'undefined') ? '' : req.query.editors;
    const subtitle = (typeof req.query.subtitle === 'undefined') ? '' : req.query.subtitle;
    const category = (typeof req.query.category === 'undefined') ? '' : req.query.category;
    const description = (typeof req.query.description === 'undefined') ? '' : req.query.description;

    //TODO: get publish_date

    try {
        const books = await pool.query("SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) WHERE \
            title ILIKE $1 AND source ILIKE $2 AND author ILIKE $3 AND editors ILIKE $4 AND subtitle ILIKE $5 AND \
            category ILIKE $6 AND description ILIKE $7 ORDER BY book_id",
        [
            '%'+title+'%', '%'+source+'%', '%'+authors+'%', '%'+editors+'%', '%'+subtitle+'%',
            '%'+category+'%', '%'+description+'%'
        ]);

        if (books.rows[0] != undefined) {
            res.status(200).json(books.rows);
            next();
        }
        else {

            let googleQuery = '';
            if (title){
                googleQuery += `intitle:${title}`;
            }
            if (authors){
                googleQuery += `inauthor:${authors}`;
            }
            if (category){
                googleQuery += `subject:${category}`;
            }
            if (editors){
                googleQuery += `inpublisher:${editors}`;
            }
            if (description){
                googleQuery += `indescription:${description}`;
            }
            if (subtitle){
                googleQuery += `intitle:${subtitle}`; //TODO: check if exist query
            }

            let googleRes = (googleQuery === '') ? undefined :
            await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${googleQuery}&maxResults=40`);
            
            if (googleRes != undefined && googleRes.data.totalItems != 0) {
                const books = googleRes.data.items
                .map( (item) => {
                    // Book info
                    let {
                        title, subtitle, description,
                        authors: author,
                        publishedDate: publish_date,
                        publisher: editors,
                        categories: category,
                        imageLinks: image_path,
                        ...rest
                    } = item.volumeInfo;
                    const source = "Google Books";
                    
                    // Parse undefined properties
                    subtitle = (typeof subtitle === 'undefined') ? '' : subtitle;
                    author = (typeof author === 'undefined') ? 'Anonymous' : author[0];
                    editors = (typeof editors === 'undefined') ? '' : editors;
                    category = (typeof category === 'undefined') ? '' : category[0];
                    description = (typeof description === 'undefined') ? '' : description;
                    image_path = (typeof image_path === 'undefined') ? '' : image_path.thumbnail;
                    publish_date = (typeof publish_date === 'undefined') ? '1000-10-10' : publish_date;
        
                    // Format date
                    publish_date = (/^\d{4}$/).test(publish_date) ? publish_date + '-01-01' :
                    (/^\d{4}-\d{2}$/).test(publish_date) ? publish_date + '-01' : publish_date;

                    
                    // TODO: fix naming collision with author vs authors
                    const authors = author;
        
                    return { title, subtitle, author, authors, description, publish_date, editors, category, image_path, source }
                });
                           
                // Save all books for db
                books.forEach(async(book) => {
                    await axios.post('http://localhost:8000/books', book, {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        }
                    });
                });

                res.status(200).json(books);
            }
            else {
                res.status(200).json({});
            }
        }
    }
    catch (err) {
        throw err;
    }
}

const getBookById = (req, res, next) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM books INNER JOIN books_info USING(book_id) INNER JOIN authors USING(author_id) INNER JOIN images USING(image_id) WHERE book_id = $1 ORDER BY book_id', [id])
    .then((data) => {
        res.status(200).json(data.rows);
        
    })
    .catch((err) => {
        throw err;
    });
}

const createBook = async(req, res, next) => {
    const { title, authors, subtitle, category, publish_date, editors, description, image_path, source } = req.body;
    
    try {
        const db_books =  await pool.query('SELECT * FROM books WHERE title = $1', [title]);
        if (db_books.rows[0] !== undefined) {
            res.status(200).send(`Book already added with ID: ${db_books.rows[0].book_id}`);
            
        }
        else {
            const db_book = await pool.query('INSERT INTO books (title, source) VALUES ($1, $2) RETURNING *', [title, source]);
            const book_id = db_book.rows[0].book_id;
            
            const db_author = await pool.query('SELECT * FROM authors WHERE author = $1', [authors]);

            let author_id = (db_author.rows[0] !== undefined) ? db_author :
            await pool.query('INSERT INTO authors (author) VALUES ($1) RETURNING *', [authors]);
            author_id = author_id.rows[0].author_id;

            const db_image = await pool.query('SELECT * FROM images WHERE image_path = $1', [image_path]);
            
            let image_id = (db_image.rows[0] !== undefined) ? db_image :
            await pool.query('INSERT INTO images (image_path) VALUES ($1) RETURNING *', [image_path]);
            image_id = image_id.rows[0].image_id
            
            const book = await pool.query('INSERT INTO books_info(book_id, subtitle, category, publish_date, editors, description, author_id, image_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [book_id,subtitle,category, publish_date, editors, description, author_id, image_id]);
            res.status(200).send(`Book added with ID: ${book.rows[0].book_id}`);
        }
    }
    catch (err) {
        throw err;
    }
}

const updateBookById = async(req, res, next) => {
    const id = parseInt(req.params.id);
    const { title, subtitle, category, publish_date, editors, description, authors, image_path } = req.body;
    
    try {
        await pool.query('UPDATE books SET title = $1 WHERE book_id = $2',[title, id]);
        await pool.query('UPDATE books SET source = $1 WHERE book_id = $2',['internal DB', id]);
        await pool.query('UPDATE books_info SET subtitle = $1 WHERE book_id = $2',[subtitle, id]);
        await pool.query('UPDATE books_info SET editors = $1 WHERE book_id = $2',[editors, id]);
        await pool.query('UPDATE books_info SET publish_date = $1 WHERE book_id = $2',[publish_date, id]);
        await pool.query('UPDATE books_info SET description = $1 WHERE book_id = $2',[description, id]);
        await pool.query('UPDATE books_info SET category = $1 WHERE book_id = $2',[category, id]);

        const db_author = await pool.query('SELECT * FROM authors WHERE author = $1', [authors]);
        let author_id = (db_author.rows[0] !== undefined) ? db_author :
        await pool.query('INSERT INTO authors (author) VALUES ($1) RETURNING *', [authors]);
        author_id = author_id.rows[0].author_id;

        await pool.query('UPDATE books_info SET author_id = $1 WHERE book_id = $2',[author_id,id])

        const db_image = await pool.query('SELECT * FROM images WHERE image_path = $1', [image_path]);
        let image_id = (db_image.rows[0] !== undefined) ? db_image :
        await pool.query('INSERT INTO images (image_path) VALUES ($1) RETURNING *', [image_path]);
        image_id = image_id.rows[0].image_id

        await pool.query('UPDATE books_info SET image_id = $1 WHERE book_id = $2',[image_id, id])

        res.status(200).send(`Book modified with ID: ${id}`);
    }
    catch (err) {
        throw err;
    }

}

const deleteBookById = async(req, res, next) => {
    const id = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM books_info WHERE book_id = $1', [id]);
        await pool.query('DELETE FROM books WHERE book_id = $1', [id]);
        res.status(200).send(`Book deleted with ID: ${id}`);
    }
    catch (err) {
        throw err;
    }
}

const deleteBooks = async(req, res, next) => {
    try {
        await pool.query('TRUNCATE books, books_info');
        res.status(200).send(`All books deleted`);
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById,
    deleteBooks
}
