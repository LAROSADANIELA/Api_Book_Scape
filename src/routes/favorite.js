const express = require('express');
const router = express.Router();

const createFavorite = require('../controllers/createFavorite');

router.post('/create', createFavorite);

module.exports = router;