var express = require('express');
var router = express.Router();
var compounds = require('../../controllers/api/v1/compounds');
var docker = require('../../controllers/api/v1/docker');

/* compounds */
router.get('/compounds/query', compounds.query);
router.get('/compounds/:cid', compounds.show);

router.get('/docker/:cid', docker.dock);

module.exports = router;
