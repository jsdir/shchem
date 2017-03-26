var express = require('express');
var router = express.Router();
var compounds = require('../../controllers/api/v1/compounds');
var docking = require('../../controllers/api/v1/docking');
var jobs = require('../../controllers/api/v1/jobs');

/* Compounds */
router.get('/compounds/query', compounds.query);
router.get('/compounds/:cid', compounds.show);

/* Docking */
router.post('/docking/start/:structure', docking.start)
router.get('/docking/job/:id', docking.showJob)

router.post('/jobs', jobs.create);

module.exports = router;
