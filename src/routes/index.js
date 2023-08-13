var express = require('express');
var router = express.Router();
const fillBdd = require('../controllers/fillBdd');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/llenar_BDD', fillBdd) 
module.exports = router;
