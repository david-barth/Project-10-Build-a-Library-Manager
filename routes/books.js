const express = require('express');
const router = express.Router();
const book = require("../models").book; 




//GET Routes for Root and Book List

router.get('/', (req, res, next) => { 
    res.redirect('/books');
 })
 /* Redirect to /books route where books are listed */

 
router.get('/books', (req, res) => {
     book.findAll({order: [['year', 'DESC']]}).then(function(books) {
         res.render('index', {books: books, title: 'Book List'});
     })
     .catch((error) => {
         res.send(500, error)
     });
 });
 /*Selects and presents all books found in the library database*/
 


 //CREATE/INSERT Routes:
 
 router.get('/books/new', (req, res) => {
     res.render('new_book', {book: book.build(), title: 'New Book'});
 })
 /*GET route for new book creation page.*/

 router.post('/books/new', (req, res) => {
     book.create(req.body).then(function(book) {
         res.redirect("/books");
     })
     .catch((error) => {
         if (error.name === "SequelizeValidationError") {
             let errorList = error.errors;
             let errorList2 = errorList.map((error) => {
                 let errorType = error.type; 
                 let errorField = error.path; 
                 return `${errorType}: ${errorField} field is empty`
             })
             res.render('form_error', {book: book.build(req.body), formError: errorList2, title: 'New Book'});
         } else {
             throw error
         }
     })
     .catch(error => {
         res.send(500, error);
     })
 })
 /*POST route to post new book model to database.  Creates customized error messages in case of validation errors*/  




 //UPDATE Route:
 
 router.get('/books/:id', (req, res, next) => {
     book.findByPk(req.params.id).then((book) => {
            if (book === null) {
                res.render('error');
            } else {
                res.render('book_detail', {book: book, title: 'Update Book'});       
            }
     })
     .catch((error) => {
         res.send(500, error);
     })
 });
 /*GET route for the update book page.  Renders a 500 error page if no book exists.*/
 

 router.post('/books/:id', (req, res, next) => {
     book.findByPk(req.params.id).then((book) => { 
         if (book) {
             return book.update(req.body);
         } else {
             res.send(404);
         }
     }).then(() => {
         res.redirect('/books');
     })
     .catch((error) => {
         if(error.name === "SequelizeValidationError") {
             let book2 = book.build(req.body);  
             book2.id = req.params.id;
           
           let errorList = error.errors;
           let errorList2 = errorList.map((error) => {
               let errorType = error.type; 
               let errorField = error.path; 
               return `${errorType}: ${errorField} field is empty`
           })
           res.render('form_error2', {book: book2, formError: errorList2});
         } else {
           throw error;
         }
     })
     .catch((error) => {
         res.send(500, error);
      });
 });
 /*POST (PUT) route for updating book information based on information in fields. Creates customized error messages in case of validation errors */



 
 //DELETE Route:
 
 router.get('/books/:id/delete', (req, res, next) => {
     book.findByPk(req.params.id).then((book) => {
             res.render('book_detail_delete', {book: book, title: 'Update Book'});
     })
     .catch((error) => {
         res.send(500, error);
     });
 });
 /*GET route for book deletion page*/
 


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
 /*POST (DELETE) route for deleting a book from the database file*/


   module.exports = router;