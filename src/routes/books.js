const express = require('express');
//const getAllBooks = express.Router();
const router = express.Router();
const allBooks = require('../controllers/allBooks');
const allTags = require('../controllers/allTags');
const filterBooks = require('../controllers/filterBooks')
const findById = require('../controllers/findById');
const allLanguage = require('../controllers/allLanguage');



/* GET books listing. */
 
router.get("/", allBooks)
router.get("/language", allLanguage)
router.get("/book/:id", findById)
router.get("/filter", filterBooks)
router.get("/tags", allTags)
//router.get("/:id", findById)
module.exports = router;