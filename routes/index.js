const express = require('express');
const router = express.Router();

//Get Home Page
router.get('/', function(req, res, next) {
  res.redirect('/books')
});

module.exports = router;

