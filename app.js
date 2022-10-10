const express = require('express');
const db = require('./routes/postgres');
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({info: "This is my app"});
});

app.get('/books', db.getBooks);

app.post('/books', db.createBook);

app.get('/books/:id', db.getBookById);

app.delete('/books/:id', db.deleteBookById);


app.listen(port, () => {
    console.log(`Listening on port: ${port}...`);
});