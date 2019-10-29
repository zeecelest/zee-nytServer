const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
//require the array of books
const books = require('./books-data.js');

app.get('/books', (req, res) => {
  //get search parameter and default it if its not provided
  const { search = ' ', sort } = req.query;

  //sort by title or rank
  if (sort) {
    if (!['title', 'rank'].includes(sort)) {
      return res.status(400).send('Sort must be one of title or rank');
    }
  }

  let results = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));

  if (sort) {
    results = results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(results);
});


app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});