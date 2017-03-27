const uuid = require('uuid');
const queue = require('../../../queue');
const bin = require('../../../util/bin');
const { CompoundView } = require('../../../models/compoundView');
const results = require('../../../../worker/results');

module.exports.start = function(req, res) {
  const structure = req.params.structure;
  const jobId = uuid();
  queue.addStartDockingJob({
    jobId: jobId,
    structure: structure,
  }, () => {
    res.json({ jobId: jobId });
  });
};

module.exports.showJob = function(req, res) {
  results.getResults(req.params.id, (results) => {
    res.json(results);
  });
};
