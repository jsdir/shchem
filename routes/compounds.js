var express = require('express');
var router = express.Router();
var compounds = require('../controllers/compounds');

/* GET compounds listing. */
router.get('/', compounds.index);

module.exports = router;
