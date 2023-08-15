const express = require('express');
//const getAllBooks = express.Router();
const router = express.Router();
const allBooks = require('../controllers/allBooks');

const findById = require('../controllers/findById');


/* GET books listing. */
 
router.get("/books", allBooks)
router.get("/books/:id", findById)


module.exports = router;