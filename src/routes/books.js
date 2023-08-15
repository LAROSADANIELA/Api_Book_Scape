const express = require('express');
//const getAllBooks = express.Router();
const router = express.Router();
const allBooks = require('../controllers/allBooks');
const allTags = require('../controllers/allTags');

const findById = require('../controllers/findById');


/* GET books listing. */
 
router.get("/", allBooks)
router.get("/tags", allTags)
//router.get("/:id", findById)

module.exports = router;