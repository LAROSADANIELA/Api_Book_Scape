const express = require('express');
const router = express.Router();
const allBooks = require('../controllers/allbooks')

/* GET books listing. */
router.get('/', (req, res)=> {
    try{

    }catch(error){
        res.status(500).json({error:error.message})
    }
})

module.exports = router;