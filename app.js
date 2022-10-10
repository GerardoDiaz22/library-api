const express = require('express');
const app = express();
const port = 8080;

/*
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
) */

app.get('/', (req, res) => {
    res.json({info: "This is my app"});
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}...`);
});