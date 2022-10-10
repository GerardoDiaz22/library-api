const express = require('express');
const bodyParser = require('bodyParser');
const db = require('./routes/postgres');
const app = express();
const port = 8080;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
    res.json({info: "This is my app"});
});

app.get('/books', db.getBooks);

app.get('/books/:id', db.getBooks);

app.listen(port, () => {
    console.log(`Listening on port: ${port}...`);
});