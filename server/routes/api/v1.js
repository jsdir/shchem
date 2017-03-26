var express = require('express');
var router = express.Router();
var compounds = require('../../controllers/api/v1/compounds');
var jobs = require('../../controllers/api/v1/jobs');
var ws = require('../../controllers/api/v1/ws');

/* GET compound */
router.get('/compounds/query', compounds.query);
router.get('/compounds/:cid', compounds.show);
router.post('/jobs', jobs.create);

module.exports = router;
