var express = require('express');
var router = express.Router();

const books = require('./books')
const users = require('./users')

router.use('/books', books);
router.use('/users', users);

module.exports = router;
