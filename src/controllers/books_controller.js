const booksModel = require('../models/books_model');

function checkFields(obj, fields) { // Checks if the given object has the specified fields as properties
  for(let i = 0; i < fields.length; i++) {
    if(!obj[fields[i]]) {return false;}
  }
  return true;
}

function httpPostBook(req, res) {

  if(!checkFields(req.body, ['title', 'author'])) {
    res.status(400).send({error: 'Data missing!'});
    return;
  }

  let newBook = {
    title: req.body.title,
    author: req.body.author
  };
  res.status(201).send(booksModel.postBook(newBook));
}

function httpPutBook(req, res) {
  let requestedId = parseInt(req.params.id);
  let book = booksModel.getBook(requestedId); // Ask the model for the specified id

  if(book !== undefined) { // If the book was found, edit it
    book.title = req.body.title;
    book.author = req.body.author;
    res.send(book); // Send as a status 200 response the edited book
    return;
  }

  res.status(404).send({error: 'Id not found!'}); // If execution didn't stop, the book wasn't found

}

function httpDeleteBook(req, res) {
  let requestedId = parseInt(req.params.id); // Parse the requested id
  if(booksModel.deleteBook(requestedId) == true) {
    res.status(200).send('Book deleted!');
    return;
  }
  res.status(404).send({error: 'Id not found!'}); // If function execution didn't stop, the book was not found
}

function httpGetAllBooks(req, res) { // No id specified
  res.send(booksModel.getAllBooks()); // Send all books registered
}

function httpGetBook(req, res) { // Specific id requested
  let requestedId = parseInt(req.params.id); // Parse the requested id
  let bookFound = booksModel.getBook(requestedId); // Ask the model for this id
  if(bookFound !== undefined) { // The model will return undefined if the book wasn't found
    res.send(bookFound);
    console.log('Book not undefined');
    return;
  }
  res.status(404).send({error: 'Id not found!'}); // If function execution didn't stop, the book was not found
}

module.exports = {
  httpPostBook,
  httpPutBook,
  httpDeleteBook,
  httpGetAllBooks,
  httpGetBook
};
