var express = require('express');
var router = express.Router();
var ctrlData = require('../controllers/data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
router.get('/molecules', ctrlData.molecules);
