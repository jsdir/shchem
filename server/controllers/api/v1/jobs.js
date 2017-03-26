var uuid = require('uuid');

var queue = require('../../../queue');

module.exports.create = function(req, res) {
  queue.addDockingJob({
    ligandCid: req.body.ligandCid,
    proteinId: req.body.proteinId
  }, function(jobId) {
    res.json({ jobId: jobId });
  });
};
