const express = require('express');
const path = require('path');
const db = require('./uimodule/webapp/libs/postgres');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, './uimodule/webapp')));

app.get('/books?', db.getBooks);

app.post('/books', db.createBook);

app.get('/books/:id', db.getBookById);

app.put('/books/:id', db.updateBookById);

app.delete('/books', db.deleteBooks);

app.delete('/books/:id', db.deleteBookById);

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}...`);
});