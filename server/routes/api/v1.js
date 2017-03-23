var express = require('express');
var router = express.Router();
var compounds = require('../../controllers/api/v1/compounds');

/* GET compound */
router.get('/compounds/query', compounds.query);
router.get('/compounds/:cid', compounds.show);

module.exports = router;
