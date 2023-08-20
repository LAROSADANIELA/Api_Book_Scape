const express = require('express');
const router = express.Router();

const createReview = require('../controllers/createReview');
const userReviews = require('../controllers/getUserReviews');

router.post('/create', createReview);
router.get('/:id', userReviews);

module.exports = router;