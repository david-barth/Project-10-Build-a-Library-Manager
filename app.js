var createError = require('http-errors');
var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var booksRouter = require('./routes/books');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', booksRouter);



// 404 Error Catcher 
app.use(function(req, res, next) {
  next(createError(404));
});



// Error handler: 404 and 500 errors
app.use(function(err, req, res, next) {

  // Provide error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page, based on error code
  
  res.status(err.status || 500);
  if (err.status === 404) {
    res.render('page_not_found')
  } else {
    res.render('error');
  };
});

module.exports = app;
