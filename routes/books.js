const express = require('express');
const router = express.Router();
const book = require("../models").book; 



//Routes:



/*router.get('/', (req, res, next) => { 
    res.redirect('/books');
 })*/

 
router.get('/books', (req, res) => {
     book.findAll({order: [['year', 'DESC']]}).then(function(books) {
         res.render('index', {books: books, title: 'Book List'});
     })
     .catch((error) => {
         res.send(500, error)
     });
 });
 
 
 //CREATE/INSERT Routes:
 
 router.get('/books/new', (req, res) => {
     res.render('new_book', {book: book.build(), title: 'New Book'});
 })
 

 router.post('/books/new', (req, res) => {
     book.create(req.body).then(function(book) {
         res.redirect("/books");
     })
     .catch((error) => {
         if (error.name === "SequelizeValidationError") {
             res.render('/books', {book: book.build(req.body), error: error.errors, title: 'New Book'});
         } else {
             throw error
         }
     })
     .catch(error => {
         res.send(500, error);
     })
 })
   
 //UPDATE Route:
 
 router.get('/books/:id', (req, res, next) => {
     book.findByPk(req.params.id).then((book) => {
             res.render('book_detail', {book: book, title: 'Update Book'});
     })
     .catch((error) => {
         res.send(500, error);
     })
 });
 

 router.post('/books/:id', (req, res, next) => {
     book.findByPk(req.params.id).then((book) => {
         if (book) {
             return book.update(req.body);
         } else {
             res.send(404);
         }
     }).then((book) => {
         res.redirect('/books');
     })
     .catch((error) => {
         if(error.name === "SequelizeValidationError") {
           const book = book.build(req.body);
           book.id = req.params.id;
           res.render("/books/:id", {book: book, errors: error.errors, title: "Edit Book"})
         } else {
           throw error;
         }
     })
     .catch((error) => {
         res.send(500, error);
      });
 });
 
 
 //DELETE Route:
 
 router.get('/books/:id/delete', (req, res, next) => {
     book.findByPk(req.params.id).then((book) => {
             res.render('book_detail_delete', {book: book, title: 'Update Book'});
     })
     .catch((error) => {
         res.send(500, error);
     });
 });
 
 
 router.post('/books/:id/delete', (req, res, next) => {
     book.findByPk(req.params.id).then((book) => {
       if (book) {
         return book.destroy();
       } else {
         res.send(404);
       }
     }).then(() => {
       res.redirect("/books");
     }).catch((error) => {
         res.send(500, error);
      });
   });
 

//Current Issues: 

   //The issue of views is not working properly right now.  None of the files are loading (500 response code). 


//Weird Behaviors:

   //The issue exists across all of the pages/routes. 



    
//Testing: 

   //1. Seeing if / route inclusion in the books route file does anything: 

        // Result: The effect appears to be minimal.  The only difference is that styles aren't modified in any way (perhaps a cached version is accessed). 

            // If the / is included into the books file, then there is a direct access of the styles sheet via 200.  If not then, the cached version might be used. 

            // End Result: Functionality still appears to work for the page. 





   module.exports = router;