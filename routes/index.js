var express = require('express');
var router = express.Router();
var ctrlData = require('../controllers/data');

router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.get('/molecules', ctrlData.molecules);

module.exports = router;
