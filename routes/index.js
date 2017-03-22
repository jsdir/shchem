var express = require('express');
var router = express.Router();
var ctrlData = require('../controllers/data');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/molecules', ctrlData.molecules);

module.exports = router;
