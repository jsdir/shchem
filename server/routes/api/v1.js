var express = require('express');
var router = express.Router();
var compounds = require('../../controllers/api/v1/compounds');
var docking = require('../../controllers/api/v1/docking');

/* Compounds */
router.get('/compounds/query', compounds.query);
router.get('/compounds/:cid', compounds.show);

/* Docking */
router.get('/docking/start/:structure', docking.start)
router.get('/docking/job/:id', docking.showJob)

module.exports = router;
