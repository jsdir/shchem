var uuid = require('uuid');

var queue = require('../../../queue');

module.exports.create = function(req, res) {
  queue.addDockingJob({
    ligandCid: req.body.ligandCid,
    pdbLink: req.body.pdbLink
  }, function(jobId) {
    res.json({ jobId: jobId });
  });
};
