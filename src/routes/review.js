const express = require('express');
const router = express.Router();

const createReview = require('../controllers/createReview');

router.post('/create', createReview);

module.exports = router;